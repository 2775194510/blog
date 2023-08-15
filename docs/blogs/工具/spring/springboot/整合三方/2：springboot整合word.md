---
title: 2：springboot整合word
date: 2023-8-15
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---
[官方文档](https://poi.apache.org/index.html)

## 1: 导入maven包
```xml
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

## 2：controller实现
```java
package com.xiaoze.exer.controller.Word;

import com.xiaoze.exer.service.impl.wordService.WordServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

/**
 * @author 小泽
 * @create 2023-08-14  21:24
 * 记得每天敲代码哦
 */
@RestController
@RequestMapping("/word")
@Api(tags = "用户列表word")
@CrossOrigin
public class WordController {

    @Autowired
    private WordServiceImpl wordService;

    @GetMapping("/word1")
    @ApiOperation("导出数据1")
    public void exportWord1(HttpServletResponse response) throws IOException {

        try {
            XWPFDocument document = wordService.exportWord1();
            response.reset();
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-disposition",
                    "attachment;filename=user_world_" + System.currentTimeMillis() + ".docx");
            OutputStream os = response.getOutputStream();
            document.write(os);
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```
## 3：service实现
```java
package com.xiaoze.exer.service.impl.wordService;

import com.alibaba.excel.EasyExcel;
import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.listener.UserListener;
import com.xiaoze.exer.mapper.UserMapper;
import org.apache.poi.util.Units;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTblPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTblWidth;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import org.springframework.core.io.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class WordServiceImpl {

    @javax.annotation.Resource
    private UserMapper salariesMapper;

    public static final String CONTENT_TYPE = "application/vnd.ms-excel";

    private ExecutorService executorService = Executors.newFixedThreadPool(20);

    private static void setExportHeader(HttpServletResponse response) {
        response.setContentType(CONTENT_TYPE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + UUID.randomUUID().toString().replaceAll("-", "") + ".docx");
    }

    public XWPFDocument exportWord1() {
        XWPFDocument doc = new XWPFDocument();

        // Title
        createTitle(doc, "Java 全栈知识体系");

        // Chapter 1
        createChapterH1(doc, "1. 知识准备");
        createChapterH2(doc, "1.1 什么是POI");
        createParagraph(doc, "Apache POI 是创建和维护操作各种符合Office Open XML（OOXML）标准和微软的OLE 2复合文档格式（OLE2）的Java API。用它可以使用Java读取和创建,修改MS Excel文件.而且,还可以使用Java读取和创建MS Word和MSPowerPoint文件。更多请参考[官方文档](https://poi.apache.org/index.html)");
        createChapterH2(doc, "1.2 POI中基础概念");
        createParagraph(doc, "生成xls和xlsx有什么区别？POI对Excel中的对象的封装对应关系？");

        // Chapter 2
        createChapterH1(doc, "2. 实现案例");
        createChapterH2(doc, "2.1 用户列表示例");
        createParagraph(doc, "以导出用户列表为例");

        // 表格
        List<User> userList = getUserList();
        XWPFParagraph paragraph = doc.createParagraph();
        XWPFTable table = paragraph.getDocument().createTable(userList.size(), 5);
        table.setWidth(500);
        table.setCellMargins(20, 20, 20, 20);

        //表格属性
        CTTblPr tablePr = table.getCTTbl().addNewTblPr();
        //表格宽度
        CTTblWidth width = tablePr.addNewTblW();
        width.setW(BigInteger.valueOf(8000));

        for(int i = 0; i< userList.size(); i++) {
            List<XWPFTableCell> tableCells = table.getRow(i).getTableCells();
            tableCells.get(0).setText(userList.get(i).getUserId()+"");
            tableCells.get(1).setText(userList.get(i).getUsername());
            tableCells.get(2).setText(userList.get(i).getEmail());
            tableCells.get(3).setText(userList.get(i).getMobile()+"");
            tableCells.get(4).setText(userList.get(i).getIntroduction());
        }

        createChapterH2(doc, "2.2 图片导出示例");
        createParagraph(doc, "以导出图片为例");
        // 图片
        InputStream stream = null;
        try {
            XWPFParagraph paragraph2 = doc.createParagraph();
            Resource resource =  new ClassPathResource(("static"+ File.separator +"logo.ico"));
            stream = new FileInputStream(resource.getFile());
            XWPFRun run = paragraph2.createRun();
            run.addPicture(stream, Document.PICTURE_TYPE_PNG, "Generated", Units.toEMU(256), Units.toEMU(256));
        } catch (IOException | InvalidFormatException e) {
            e.printStackTrace();
        }

        return doc;
    }

    private void createTitle(XWPFDocument doc, String content) {
        XWPFParagraph title = doc.createParagraph();
        title.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun r1 = title.createRun();
        r1.setBold(true);
        r1.setFontFamily("宋体");
        r1.setText(content);
        r1.setFontSize(22);
    }

    private void createChapterH1(XWPFDocument doc, String content) {
        XWPFParagraph actTheme = doc.createParagraph();
        actTheme.setAlignment(ParagraphAlignment.LEFT);
        XWPFRun runText1 = actTheme.createRun();
        runText1.setBold(true);
        runText1.setText(content);
        runText1.setFontSize(18);
    }

    private void createChapterH2(XWPFDocument doc, String content) {
        XWPFParagraph actType = doc.createParagraph();
        XWPFRun runText2 = actType.createRun();
        runText2.setBold(true);
        runText2.setText(content);
        runText2.setFontSize(15);
    }

    private void createParagraph(XWPFDocument doc, String content) {
        XWPFParagraph actType = doc.createParagraph();
        XWPFRun runText2 = actType.createRun();
        runText2.setText(content);
        runText2.setFontSize(11);
    }

    private List<User> getUserList() {
        return salariesMapper.selectList(null);
    }

}

```