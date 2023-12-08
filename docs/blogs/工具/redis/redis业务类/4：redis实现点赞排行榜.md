---
title: 4：redis实现点赞排行榜
date: 2023-12-08
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---

## 1：前期思考

在 `redis` 中使用的是 `set` 集合，**但是发现他其实并不能够满足排行榜的功能**，所以需要改变。

![Alt text](./assets/image8.png)

**在这里使用 `sortedSet` 更适合一点。** 

- 通过 `ZSCORE` 命令获取 `SortedSet` 中存储的元素的相关的 `SCORE` 值。
- 通过 `ZRANGE` 命令获取指定范围内的元素。

## 2：主要思路

- 1.因为要实现排序功能，所以set集合并不能满足，需要一个 ***有权重的集合***，也就是`SortedSet`.(采用时间戳来实现权重，最后根据时间戳来进行排序。)

- 2：从redis中拿到前5的用户id（拿到的是set集合）

`List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());`
可以转换成list集合来处理数据。
- 3：根据id查询数据库。

## 3：代码实现
controller
```java
@RestController
@RequestMapping("/blog")
public class BlogController {
 
    @Resource
    private IBlogService blogService;
 
    @PutMapping("/like/{id}")
    public Result likeBlog(@PathVariable("id") Long id) {
        return blogService.likeBlog(id);
    }
 
    @GetMapping("/hot")
    public Result queryHotBlog(@RequestParam(value = "current", defaultValue = "1") Integer current) {
        return blogService.queryHotBlog(current);
    }
 
    @GetMapping("/{id}")
    public Result queryBlogById(@PathVariable("id") String id){
        return blogService.queryBlogById(id);
    }
 
    @GetMapping("/likes/{id}")
    public Result queryBlogLikes(@PathVariable("id") String id) {
        return blogService.queryBlogLikes(id);
    }
}
```

service

```java
@Service
public class BlogServiceImpl extends ServiceImpl<BlogMapper, Blog> implements IBlogService {
 
    @Autowired
    private IUserService userService;
 
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
 
    //点赞业务。
    @Override
    public Result likeBlog(Long id) {
        // 1、获取登录用户
        UserDTO user = UserHolder.getUser();
        // 2、判断当前登录用户是否已经点赞(redis)
        Double score = stringRedisTemplate.opsForZSet().score(RedisConstants.BLOG_LIKED_KEY + id, user.getId().toString());
        // 3、如果未点赞，可以点赞
        if (score == null) {
            // 3.1、数据库点赞数 +1
            boolean isSuccess = update().setSql("liked = liked + 1").eq("id", user.getId().toString()).update();
            if (isSuccess) {
                // 3.2、保存用户到 Redis 的 zset 集合,用时间戳来 代表 权重  zadd key value score
                stringRedisTemplate.opsForZSet().add(RedisConstants.BLOG_LIKED_KEY + id,
                        user.getId().toString(),
                        System.currentTimeMillis());
            }
            // 4、如果已点赞，取消点赞
        } else {
            // 4.1、数据库点赞数 -1
            boolean isSuccess = update().setSql("liked = liked - 1").eq("id", user.getId().toString()).update();
            if (isSuccess) {
                // 4.2、把用户从 Redis 的 zset 集合移除
                stringRedisTemplate.opsForZSet().remove(RedisConstants.BLOG_LIKED_KEY + id, user.getId().toString());
            }
        }
        return Result.ok();
    }
 
    //首页展示。
    @Override
    public Result queryHotBlog(Integer current) {
        // 根据用户查询
        Page<Blog> page = query()
                .orderByDesc("liked")
                .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
        // 获取当前页数据
        List<Blog> records = page.getRecords();
        // 查询用户
        records.forEach(blog -> {
            this.queryBlogUser(blog);
            this.isBlogLiked(blog);
        });
        return Result.ok(records);
    }
 
    //具体id展示。
    private void queryBlogUser(Blog blog) {
        Long userId = blog.getUserId();
        User user = userService.getById(userId);
        blog.setName(user.getNickName());
        blog.setIcon(user.getIcon());
    }
 
    @Override
    public Result queryBlogById(String id) {
        Blog blog = getById(id);
 
        if (blog == null) {
            return Result.fail("笔记不存在！");
        }
 
        queryBlogUser(blog);
        // 查询 Blog 是否被点赞
        isBlogLiked(blog);
 
        return Result.ok(blog);
    }
 
    private void isBlogLiked(Blog blog) {
        Long userId = blog.getUserId();
        String key = RedisConstants.BLOG_LIKED_KEY + blog.getId();
        Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
        blog.setIsLike(score != null);
    }
 
    @Override
    public Result queryBlogLikes(String id) {
        String key = RedisConstants.BLOG_LIKED_KEY + id;
        // 查询 top5 的点赞用户
        Set<String> top5 = stringRedisTemplate.opsForZSet().range(key, 0, 4);
        if (top5 == null) {
            return Result.ok(Collections.emptyList());
        }
        // 解析出其中的用户id
        List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());
        String join = StrUtil.join(",", ids);
        // 根据用户id查询用户
        List<UserDTO> userDTOS = userService.query().in("id", ids).last("order by filed(id, " + join + ")").list()
                .stream()
                .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
                .collect(Collectors.toList());
 
        return Result.ok(userDTOS);
    }
}
```
