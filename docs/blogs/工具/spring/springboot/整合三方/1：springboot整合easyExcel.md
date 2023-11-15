---
title: 1：springboot整合easyExcel
date: 2023-8-15
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

[官方文档](https://easyexcel.opensource.alibaba.com/docs/current/)

## 1: 导入maven包
```xml
      <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>easyexcel</artifactId>
            <version>3.2.0</version>
        </dependency>
        <!--        EasyExcel 3.2.0版本需要使用poi 4.1.0及以上    xls-->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>4.1.2</version>
        </dependency>

        <!--    EasyExcel 3.2.0版本需要使用poi 4.1.0及以上     xlsx-->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>4.1.2</version>
        </dependency>
```
## 2：application.yml
```xml
spring:
  servlet:
    multipart:
      max-request-size: 30MB
      max-file-size: 1024MB
```
## 3：其中所用到得工具类
```java
package com.xiaoze.exer.utils;

import org.apache.commons.collections4.CollectionUtils;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
/**
* 方法描述: excel文件工具类
* @Author 胡昊泽
* @Date 2023/8/11 19:49
* @return
*/
public class TestFileUtil {

    public static InputStream getResourcesFileInputStream(String fileName) {
        return Thread.currentThread().getContextClassLoader().getResourceAsStream("" + fileName);
    }

    public static String getPath() {
        return TestFileUtil.class.getResource("/").getPath();
    }

    public static TestPathBuild pathBuild() {
        return new TestPathBuild();
    }

    public static File createNewFile(String pathName) {
        File file = new File(getPath() + pathName);
        if (file.exists()) {
            file.delete();
        } else {
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
        }
        return file;
    }

    public static File readFile(String pathName) {
        return new File(getPath() + pathName);
    }

    public static File readUserHomeFile(String pathName) {
        return new File(System.getProperty("user.home") + File.separator + pathName);
    }

    /**
     * build to test file path
     **/
    public static class TestPathBuild {
        private TestPathBuild() {
            subPath = new ArrayList<>();
        }

        private final List<String> subPath;

        public TestPathBuild sub(String dirOrFile) {
            subPath.add(dirOrFile);
            return this;
        }

        public String getPath() {
            if (CollectionUtils.isEmpty(subPath)) {
                return TestFileUtil.class.getResource("/").getPath();
            }
            if (subPath.size() == 1) {
                return TestFileUtil.class.getResource("/").getPath() + subPath.get(0);
            }
            StringBuilder path = new StringBuilder(TestFileUtil.class.getResource("/").getPath());
            path.append(subPath.get(0));
            for (int i = 1; i < subPath.size(); i++) {
                path.append(File.separator).append(subPath.get(i));
            }
            return path.toString();
        }

    }

}
```
## 4：controller
```java
package com.xiaoze.exer.controller.EasyExcel;

import com.xiaoze.exer.service.impl.excelService.ExportService;
import com.xiaoze.exer.service.impl.excelService.ImportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 小泽
 * @create 2023-08-11  18:50
 * 记得每天敲代码哦
 */
@RestController
@RequestMapping("/users")
@Api(tags = "用户列表导入导出")
@CrossOrigin
public class UserImportExportController {

    @Resource
    private ExportService exportService;

    @Resource
    private ImportService importService;

    @GetMapping("/export1")
    @ApiOperation("导出数据1")
    public void exportExcel1(HttpServletResponse response) throws IOException {
        // 一整个Sheet
        exportService.exportExcel1(response);
    }


    @GetMapping("/export2")
    @ApiOperation("导出数据2")
    public void exportExcel2(HttpServletResponse response) throws IOException {
        //分多个sheet
        exportService.exportExcel2(response);
    }


    @GetMapping("/export3")
    @ApiOperation("导出数据3")
    public void exportExcel3(HttpServletResponse response) throws IOException {
        exportService.exportExcel3(response);
    }

    @GetMapping("/export4")
    @ApiOperation("导出数据4")
    public void exportExcel4(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.exportExcel4(response);
    }

    @GetMapping("/fill1")
    @ApiOperation("填充数据1")
    public void fillExcel1(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.fillExcel1(response);
    }

    @GetMapping("/fill2")
    @ApiOperation("填充数据2")
    public void fillExcel2(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.fillExcel2(response);
    }

    @GetMapping("/fill3")
    @ApiOperation("填充数据3")
    public void fillExcel3(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.fillExcel3(response);
    }

    @GetMapping("/fill4")
    @ApiOperation("填充数据4")
    public void fillExcel4(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.fillExcel4(response);
    }

    @GetMapping("/fill5")
    @ApiOperation("横向填充1")
    public void fillExcel5(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.fillExcel5(response);
    }

    @GetMapping("/fill6")
    @ApiOperation("横向填充2")
    public void fillExcel6(HttpServletResponse response) throws IOException, InterruptedException {
        exportService.fillExcel6(response);
    }

    @PostMapping("/import1")
    @ApiOperation("导入数据1")
    public void importExcel1(MultipartFile file) throws IOException {
        importService.importExcel(file);
    }

    @PostMapping("/import2")
    @ApiOperation("导入数据2")
    public void importExcel2(MultipartFile file) throws IOException {
        importService.importExcelAsync(file);
    }

}

```
### 1）ExportService导出实现
```java
package com.xiaoze.exer.service.impl.excelService;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.enums.WriteDirectionEnum;
import com.alibaba.excel.util.ListUtils;
import com.alibaba.excel.util.MapUtils;
import com.alibaba.excel.write.metadata.WriteSheet;
import com.alibaba.excel.write.metadata.fill.FillConfig;
import com.alibaba.excel.write.metadata.fill.FillWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.mapper.UserMapper;
import com.xiaoze.exer.utils.TestFileUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 作者：hhz
 */
@Service
public class ExportService {
    public static final String CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    @Resource
    private UserMapper salariesMapper;

    public void exportExcel1(HttpServletResponse response) throws IOException {

        setExportHeader(response);

        List<User> salaries = salariesMapper.selectList(null);

        EasyExcel.write(response.getOutputStream(), User.class).sheet("sheet1").doWrite(salaries);
    }



    public void exportExcel2(HttpServletResponse response) throws IOException {

        setExportHeader(response);

        List<User> salaries = salariesMapper.selectList(null);

        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream(), User.class).build()) {
            WriteSheet writeSheet1 = EasyExcel.writerSheet(1, "模板1").build();
            WriteSheet writeSheet2 = EasyExcel.writerSheet(2, "模板2").build();
            WriteSheet writeSheet3 = EasyExcel.writerSheet(3, "模板3").build();

            List<User> data1 = salaries.subList(0, salaries.size() / 3);
            List<User> data2 = salaries.subList(salaries.size() / 3, salaries.size() * 2 / 3);
            List<User> data3 = salaries.subList(salaries.size() * 2 / 3, salaries.size());
            excelWriter.write(data1, writeSheet1);
            excelWriter.write(data2, writeSheet2);
            excelWriter.write(data3, writeSheet3);
        }
    }



    public void exportExcel3(HttpServletResponse response) throws IOException {

        setExportHeader(response);

        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream(), User.class).build()) {

            Long count = Long.valueOf(salariesMapper.selectCount(null));
            Integer pages = 10;
            Long size = count / pages;

            for (int i = 0; i < pages; i++) {
                WriteSheet writeSheet = EasyExcel.writerSheet(i, "模板" + i).build();

                Page<User> page = new Page<>();
                page.setCurrent(i + 1);
                page.setSize(size);
                Page<User> selectPage = salariesMapper.selectPage(page, null);

                excelWriter.write(selectPage.getRecords(), writeSheet);
            }
        }
    }


    public void exportExcel4(HttpServletResponse response) throws IOException, InterruptedException {

        setExportHeader(response);

        Long count = Long.valueOf(salariesMapper.selectCount(null));

        Integer pages = 20;
        Long size = count / pages;

        ExecutorService executorService = Executors.newFixedThreadPool(pages);
        CountDownLatch countDownLatch = new CountDownLatch(pages);

        Map<Integer, Page<User>> pageMap = new HashMap<>();
        for (int i = 0; i < pages; i++) {
            int finalI = i;
            executorService.submit(new Runnable() {
                @Override
                public void run() {
                    Page<User> page = new Page<>();
                    page.setCurrent(finalI + 1);
                    page.setSize(size);
                    Page<User> selectPage = salariesMapper.selectPage(page, null);

                    pageMap.put(finalI, selectPage);
                    countDownLatch.countDown();
                }
            });
        }

        countDownLatch.await();

        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream(), User.class).build()) {
            for (Map.Entry<Integer, Page<User>> entry : pageMap.entrySet()) {
                Integer num = entry.getKey();
                Page<User> salariesPage = entry.getValue();
                WriteSheet writeSheet = EasyExcel.writerSheet(num, "模板" + num).build();
                excelWriter.write(salariesPage.getRecords(), writeSheet);
            }
        }

        // https://github.com/alibaba/easyexcel/issues/1040
    }

    public void fillExcel1(HttpServletResponse response) throws IOException {

        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 加载模板地址
        String templateFileName =
                TestFileUtil.getPath() + "fillExcel" + File.separator + "simple.xlsx";
        setExportHeader(response);
        User user = new User();
        user.setUsername("221321323123");
        user.setPassword("13123123312");

        EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).sheet().doFill(user);
    }

    public void fillExcel2(HttpServletResponse response) throws IOException {

        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 加载模板地址
        String templateFileName =
                TestFileUtil.getPath() + "fillExcel" + File.separator + "list.xlsx";
        setExportHeader(response);
        List<User> userList = salariesMapper.selectList(null);
        //方案1 一下子全部放到内存里面 并填充
        // 这里 会填充到第一个sheet， 然后文件流会自动关闭
        EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).sheet().doFill(userList);

        //方案2 分多次 填充 会使用文件缓存（省内存）
        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).build()) {
            WriteSheet writeSheet = EasyExcel.writerSheet().build();
            excelWriter.fill(userList, writeSheet);
            excelWriter.fill(userList, writeSheet);
        }

    }

    public void fillExcel3(HttpServletResponse response) throws IOException {

        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 加载模板地址
        String templateFileName =
                TestFileUtil.getPath() + "fillExcel" + File.separator + "complex.xlsx";
        setExportHeader(response);
        List<User> userList = salariesMapper.selectList(null);
        // 方案1
        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).build()) {
            WriteSheet writeSheet = EasyExcel.writerSheet().build();
            // 这里注意 入参用了forceNewRow 代表在写入list的时候不管list下面有没有空行 都会创建一行，然后下面的数据往后移动。默认 是false，会直接使用下一行，如果没有则创建。
            // forceNewRow 如果设置了true,有个缺点 就是他会把所有的数据都放到内存了，所以慎用
            // 简单的说 如果你的模板有list,且list不是最后一行，下面还有数据需要填充 就必须设置 forceNewRow=true 但是这个就会把所有数据放到内存 会很耗内存
            // 如果数据量大 list不是最后一行 参照下一个
            FillConfig fillConfig = FillConfig.builder().forceNewRow(Boolean.TRUE).build();
            excelWriter.fill(userList, fillConfig, writeSheet);
            excelWriter.fill(userList, fillConfig, writeSheet);
            Map<String, Object> map = MapUtils.newHashMap();
            map.put("date", "2023年10月9日13:28:28");
            map.put("total", userList.size());
            excelWriter.fill(map, writeSheet);
        }
    }

    public void fillExcel4(HttpServletResponse response) throws IOException {

        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 加载模板地址
        String templateFileName =
                TestFileUtil.getPath() + "fillExcel" + File.separator + "complex.xlsx";
        setExportHeader(response);
        List<User> userList = salariesMapper.selectList(null);
        // 方案1
        // 方案1
        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).build()) {
            WriteSheet writeSheet = EasyExcel.writerSheet().build();
            // 直接写入数据
            excelWriter.fill(userList, writeSheet);

            // 写入list之前的数据
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("date", "2019年10月9日13:28:28");
            excelWriter.fill(map, writeSheet);

            // list 后面还有个统计 想办法手动写入
            // 这里偷懒直接用list 也可以用对象
            List<List<String>> totalListList = ListUtils.newArrayList();
            List<String> totalList = ListUtils.newArrayList();
            totalListList.add(totalList);
            totalList.add(null);
            totalList.add(null);
            totalList.add(null);
            // 第四列
            totalList.add("统计:1000");
            // 这里是write 别和fill 搞错了
            excelWriter.write(totalListList, writeSheet);
            // 总体上写法比较复杂 但是也没有想到好的版本 异步的去写入excel 不支持行的删除和移动，也不支持备注这种的写入，所以也排除了可以
            // 新建一个 然后一点点复制过来的方案，最后导致list需要新增行的时候，后面的列的数据没法后移，后续会继续想想解决方案
        }
    }

    /**
     * 方法描述: 横向填充
     *
     * @param response:
     * @return void
     * @Author 胡昊泽
     * @Date 2023/8/14 21:12
     */
    public void fillExcel5(HttpServletResponse response) throws IOException {

        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 加载模板地址
        String templateFileName =
                TestFileUtil.getPath() + "fillExcel" + File.separator + "horizontal.xlsx";
        setExportHeader(response);
        List<User> userList = salariesMapper.selectList(null);
        // 方案1
        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).build()) {
            WriteSheet writeSheet = EasyExcel.writerSheet().build();
            FillConfig fillConfig = FillConfig.builder().direction(WriteDirectionEnum.HORIZONTAL).build();
            excelWriter.fill(userList, fillConfig, writeSheet);
            excelWriter.fill(userList, fillConfig, writeSheet);

            Map<String, Object> map = new HashMap<>();
            map.put("date", "2019年10月9日13:28:28");
            excelWriter.fill(map, writeSheet);
        }
    }

    /**
     * 方法描述: 复杂得横向填充
     *
     * @param response:
     * @return void
     * @Author 胡昊泽
     * @Date 2023/8/14 21:13
     */
    public void fillExcel6(HttpServletResponse response) throws IOException {

        // 模板注意 用{} 来表示你要用的变量 如果本来就有"{","}" 特殊字符 用"\{","\}"代替
        // 加载模板地址
        String templateFileName =
                TestFileUtil.getPath() + "fillExcel" + File.separator + "composite.xlsx";
        setExportHeader(response);
        List<User> userList = salariesMapper.selectList(null);
        // 方案1
        try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).withTemplate(templateFileName).build()) {
            WriteSheet writeSheet = EasyExcel.writerSheet().build();
            FillConfig fillConfig = FillConfig.builder().direction(WriteDirectionEnum.HORIZONTAL).build();
            // 如果有多个list 模板上必须有{前缀.} 这里的前缀就是 data1，然后多个list必须用 FillWrapper包裹
            excelWriter.fill(new FillWrapper("data1", userList), fillConfig, writeSheet);
            excelWriter.fill(new FillWrapper("data1", userList), fillConfig, writeSheet);
            excelWriter.fill(new FillWrapper("data2", userList), writeSheet);
            excelWriter.fill(new FillWrapper("data2", userList), writeSheet);
            excelWriter.fill(new FillWrapper("data3", userList), writeSheet);
            excelWriter.fill(new FillWrapper("data3", userList), writeSheet);

            Map<String, Object> map = new HashMap<String, Object>();
            //map.put("date", "2019年10月9日13:28:28");
            map.put("date", new Date());

            excelWriter.fill(map, writeSheet);
        }
    }

    private static void setExportHeader(HttpServletResponse response) {
        response.setContentType(CONTENT_TYPE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + UUID.randomUUID().toString().replaceAll("-", "") + ".xlsx");
    }
}

```

### 2）ImportService导入实现

监听器
```java
package com.xiaoze.exer.listener;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.read.listener.ReadListener;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.mapper.UserMapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;


@Component
public class UserListener extends ServiceImpl<UserMapper, User> implements ReadListener<User>, IService<User> {

    private static final Log logger = LogFactory.getLog(UserListener.class);

    private ExecutorService executorService = Executors.newFixedThreadPool(20);

    private ThreadLocal<ArrayList<User>> salariesList = ThreadLocal.withInitial(ArrayList::new);
    private static AtomicInteger count = new AtomicInteger(1);
    private static final int batchSize = 10000;

    @Resource
    private UserListener salariesListener;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void invoke(User data, AnalysisContext context) {
//        saveOne(data);

        salariesList.get().add(data);
        if (salariesList.get().size() >= batchSize) {
//            saveData();
            asyncSaveData();
        }
    }

    public void saveOne(User data){
        save(data);
        logger.info("第" + count.getAndAdd(1) + "次插入1条数据");
    }

    public void saveData() {
        if (!salariesList.get().isEmpty()) {
            saveBatch(salariesList.get(), salariesList.get().size());
            logger.info("第" + count.getAndAdd(1) + "次插入" + salariesList.get().size() + "条数据");
            salariesList.get().clear();
        }
    }

    public void asyncSaveData() {
        if (!salariesList.get().isEmpty()) {
            ArrayList<User> salaries = (ArrayList<User>) salariesList.get().clone();
            executorService.execute(new SaveTask(salaries, salariesListener));
            salariesList.get().clear();
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void doAfterAllAnalysed(AnalysisContext context) {
        logger.info("一个Sheet全部处理完");
        if (salariesList.get().size() >= batchSize) {
            saveData();
        }
    }

    static class SaveTask implements Runnable {

        private List<User> salariesList;
        private UserListener salariesListener;

        public SaveTask(List<User> salariesList, UserListener salariesListener) {
            this.salariesList = salariesList;
            this.salariesListener = salariesListener;
        }

        @Override
        public void run() {
            salariesListener.saveBatch(salariesList);
            logger.info("第" + count.getAndAdd(1) + "次插入" + salariesList.size() + "条数据");
        }
    }
}
```

```java
package com.xiaoze.exer.service.impl.excelService;

import com.alibaba.excel.EasyExcel;
import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.listener.UserListener;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 作者：hhz
 */
@Service
public class ImportService {

    @Resource
    private UserListener salariesListener;

    private ExecutorService executorService = Executors.newFixedThreadPool(20);

    public void importExcel(MultipartFile file) throws IOException {
        EasyExcel.read(file.getInputStream(), User.class, salariesListener).doReadAll();
    }


    public void importExcelAsync(MultipartFile file) {
        // 开20个线程分别处理20个sheet

        List<Callable<Object>> tasks = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            int num = i;
            tasks.add(() -> {
                EasyExcel.read(file.getInputStream(), User.class, salariesListener)
                        .sheet(num).doRead();
                return null;
            });
        }

        try {
            executorService.invokeAll(tasks);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

}

```