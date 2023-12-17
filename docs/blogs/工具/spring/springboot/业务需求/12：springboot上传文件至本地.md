---
title: 12：springboot上传文件至本地
date: 2023-7-22
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1：application.prperties

```java
#文件上传最大20MB
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=100MB
```

## 2：controller
```java
    @RequestMapping("/updateUserPic")
    public Result updatePic(@RequestParam("file") MultipartFile avatorFile,
                            @RequestParam("id") Integer id){

        Assert.notNull(avatorFile,"文件为空，上传错误");
        User user = userService.getById(id);
        Assert.notNull(user,"用户信息不存在，上传错误");

        //文件名 = 当前时间到毫秒+原来的文件名
        String filename = System.currentTimeMillis()+avatorFile.getOriginalFilename();
        //文件路径
        String filePath = System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                +System.getProperty("file.separator")+"pic"+System.getProperty("file.separator");

        String deletefile = (System.getProperty("user.dir")+System.getProperty("file.separator"))
                .replaceAll("\\\\","/")
                +user.getPic().substring(1);

        File file = new File(deletefile);

        //如果文件路径不存在，新增该路径
        File file1= new File(filePath);
        if(!file1.exists()){
            file1.mkdir();
        }

        //实际的文件地址
        File dest = new File(filePath + System.getProperty("file.separator") + filename);
        //存储到数据库里的相对文件地址
        String storeAvatorPath = "/img/pic/"+filename;
        try {
            avatorFile.transferTo(dest);
            user.setPic(storeAvatorPath);
            userService.saveOrUpdate(user);
            if(file.exists()){
                file.delete();
            }
            return Result.succ("上传成功！",user);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Result.fail("上传失败");
    }

```

## 3：配置类
```java
@Configuration
public class FileConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //所有img/singerPic/**开头的请求 都会去后面配置的路径下查找资源
        //定位歌手头像地址
        registry.addResourceHandler("/img/pic/**").addResourceLocations(
                "file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"pic"+System.getProperty("file.separator")
        );

        //定位游戏头像地址
        registry.addResourceHandler("/img/game/**").addResourceLocations(
                "file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"game"+System.getProperty("file.separator")
        );
    }
}


```