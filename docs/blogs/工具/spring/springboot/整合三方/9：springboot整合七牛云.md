---
title: 9：springboot整合七牛云
date: 2023-12-11
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1：maven配置
```xml
   <dependencies>
        <!--七牛云SDK-->
        <dependency>
            <groupId>com.qiniu</groupId>
            <artifactId>qiniu-java-sdk</artifactId>
            <version>[7.7.0, 7.7.99]</version>
        </dependency>
        <!-- 日期工具栏依赖 -->
        <dependency>
            <groupId>joda-time</groupId>
            <artifactId>joda-time</artifactId>
            <version>2.10.1</version>
        </dependency>
    </dependencies>
```

## 2：application.yml配置七牛云信息。
```yml
#AK  和  SK可以去密钥管理中查询
qiniu:
  accessKey:  你的AK
  secretKey:  你的SK
  bucketName:  空间名称
  path: 你的域名地址
```

## 3：具体实现

### 1）目录结构

![Alt text](./img/image6.png)

### 2）上传配置

```java
@Configuration
public class UploadConfig {
    @Value("${qiniu.accessKey}")
    private String accessKey;
    @Value("${qiniu.secretKey}")
    private String secretKey;
 
    @Bean
    public Auth getAuth() {
        return Auth.create(accessKey, secretKey);
    }
 
    @Bean
    public UploadManager getUploadManager() {
        return new UploadManager(new com.qiniu.storage.Configuration());
    }
}
```

### 3）七牛配置（这个才是真正上传文件得方法，提供给service实现类调用）

```java
@Component
public class QiniuUtils {
    @Autowired
    private UploadManager uploadManager;
    @Autowired
    private Auth auth;
 
    @Value("${qiniu.bucketName}")
    private String bucketName;
    @Value("${qiniu.path}")
    private String url;
 
    public String upload(FileInputStream file, String fileName) throws QiniuException {
        String token = auth.uploadToken(bucketName);
        Response res = uploadManager.put(file, fileName, token, null, null);
        if (!res.isOK()) {
            throw new RuntimeException("上传七牛云出错:" + res);
        }
        return url + "/" + fileName;
    }
 
}
```

### 4）文件命名。主要是为了防止生成一样得文件名，然后覆盖文件。
```java
public class StringUtils {
    /**
     * @Description: 生成唯一图片名称
     * @Param: fileName
     * @return: 云服务器fileName
     */
    public static String getRandomImgName(String fileName) {
 
        // System.out.println("文件名是："+fileName);  800027618.jpg
        //获取最后一个.得索引。
        int index = fileName.lastIndexOf(".");
 
        if (fileName.isEmpty() || index == -1) {
            throw new IllegalArgumentException();
        }
 
        String filename1 = fileName.substring(0, index);
        System.out.println("filename1"+filename1);
        // 获取文件后缀
        String suffix = fileName.substring(index).toLowerCase();
        // System.out.println("文件后缀是：  "+ suffix);
        // 生成UUID
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        // System.out.println("uuid是："+uuid);
 
        //对图片进行日期分页，每天存放在一个文件夹下面
        String datePath = new DateTime().toString("yyyy/MM/dd");
        // 生成上传至云服务器的路径
        return datePath+"/"+ uuid + filename1+ suffix;
    }
}
```

### 5）统一返回数据格式。
```java
package com.xiaoze.commonutils;
 
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
 
import java.util.HashMap;
import java.util.Map;
 
@Data
//统一返回结果
public class R {
    @ApiModelProperty(value = "是否成功")
    private Boolean success;
 
    @ApiModelProperty(value = "返回码")
    private Integer code;
 
    @ApiModelProperty(value = "返回消息")
    private String message;
 
    @ApiModelProperty(value = "返回数据")
    private Map<String, Object> data = new HashMap<String, Object>();
 
    //构造方法私有
    private R(){}
 
    //成功静态方法
    public static R ok(){
        R resultVo=new R();
        resultVo.setSuccess(true);
        resultVo.setCode(ResultCode.SUCCESS);
        resultVo.setMessage("成功");
        return resultVo;
    }
    //失败静态方法
    public static R error(){
        R resultVo=new R();
        resultVo.setSuccess(false);
        resultVo.setCode(ResultCode.ERROR);
        resultVo.setMessage("失败");
        return resultVo;
    }
 
    public R success(Boolean success){
        this.setSuccess(success);
        return this;
 
    }
    public R message(String message){
        this.setMessage(message);
        return this;
    }
    
    public R code(Integer code){
        this.setCode(code);
        return this;
    }
    
    public R data(String key, Object value){
        this.data.put(key,value);
        return this;
    }
    
    public R data(Map<String,Object> map){
        this.setData(map);
        return this;
    }
 
}
```

### 6）controller
```java
   //上传头像的方法
    @ApiOperation(value = "文件上传")
    @PostMapping(value = "/upload")
    public R upload(@RequestParam("file") MultipartFile file) {
        String path = pictureService.upload(file);
        System.out.println(path);
        return R.ok().data("url",path);
    }
```

### 7）service
```java
public interface PictureService {
    String upload(MultipartFile file);
}
```

### 8）ServiceImpl
```java
@Service
public class PictureServiceImpl implements PictureService {
 
    @Autowired
    private QiniuUtils qiniuUtils;
 
    @Override
    public String upload(MultipartFile file) {
        if (file.isEmpty()) {
            return "上传文件为空,请重试...";
        }
        String fileName = StringUtils.getRandomImgName(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            FileInputStream uploadFile = (FileInputStream) file.getInputStream();
            String path = qiniuUtils.upload(uploadFile, fileName);
 
            // System.out.println("fileName           "+fileName);   随机创建得文件名
            // System.out.println("path为：               "+path);   随机创建得文件名和地址整合
            return "http://"+path;
            // return new Result(HttpStatus.OK.value(),path);
        } catch (IOException e) {
            e.printStackTrace();
            return "服务器内部错误...";
        }
    }
 
}
```