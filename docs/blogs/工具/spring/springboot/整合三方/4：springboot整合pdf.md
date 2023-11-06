---
title: 4：springboot整合pdf
date: 2023-8-15
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1: 导入maven包
```xml

        <dependency>
            <groupId>com.itextpdf</groupId>
            <artifactId>itextpdf</artifactId>
            <version>5.5.13</version>
        </dependency>
        <!-- 输出中文，还要引入下面itext-asian.jar包 -->
        <dependency>
            <groupId>com.itextpdf</groupId>
            <artifactId>itext-asian</artifactId>
            <version>5.2.0</version>
        </dependency>
        <dependency>
            <groupId>com.itextpdf.tool</groupId>
            <artifactId>xmlworker</artifactId>
            <version>5.5.13</version>
        </dependency>
        <!-- 需要引入这个包，复杂base64位图片不显示 -->
        <dependency>
            <groupId>org.xhtmlrenderer</groupId>
            <artifactId>flying-saucer-pdf</artifactId>
            <version>9.1.5</version>
            <exclusions>
                <exclusion>
                    <artifactId>bcprov-jdk14</artifactId>
                    <groupId>org.bouncycastle</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.xhtmlrenderer</groupId>
            <artifactId>flying-saucer-pdf-itext5</artifactId>
            <version>9.1.22</version>
        </dependency>
        <dependency>
            <groupId>org.apache.pdfbox</groupId>
            <artifactId>pdfbox</artifactId>
            <version>2.0.8</version>
        </dependency>

        <!-- 设置pdf文件密码，要引入下面bcprov-jdk15on.jar包 -->
        <dependency>
            <groupId>org.bouncycastle</groupId>
            <artifactId>bcprov-jdk16</artifactId>
            <version>1.46</version>
        </dependency>
```
## 2：主要步骤
### 1.新建document对象，可通过一下三种任意一种

 `Document document =new Document();` // 默认页面大小是A4  
 `Document document =new Document(PageSize.A4);` // 指定页面大小为A4  
 `Document document =new Document(PageSize.A4,50,50,30,20);` // 指定页面大小为A4，且自定义页边距(`marginLeft`、`marginRight`、`marginTop`、`marginBottom`)
 其中页面大小`PageSize`也可自定义大小，例：`new Document(new Rectangle(400, 500));`

### 2.建立一个书写器(Writer)与document对象关联，通过书写器(Writer)可以将文档写入到磁盘中。

 创建 `PdfWriter` 对象 第一个参数是对文档对象的引用，第二个参数是文件的实际名称，在该名称中还会给出其输出路径
 `PdfWriter writer =PdfWriter.getInstance(document,new FileOutputStream(filePath));`

### 3.打开文档

 写入数据之前要打开文档
 `document.open();`

### 4.向文档中添加内容  
 `document.add();`

### 5.关闭文档   
 `document.close();`

## 3：主要组成部分

### 1）字体

新建一个字体,iText的方法

 `BaseFont bfChinese;`  
 `bfChinese=BaseFont.createFont(“STSongStd-Light”,”UniGB-UCS2-H”,BaseFont.NOT_EMBEDDED);`//jar包  
 `bfChinese=BaseFont.createFont(“C:/Windows/Fonts/msyh.ttf”,BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED);` //系统字体，其实5.0版以后的iText加入字体还是很方便的。  

 - `STSongStd-Light` 是字体，在jar 中以property为后缀
 - `UniGB-UCS2-H` 是编码，在jar 中以cmap为后缀
 - `H` 代表文字版式是横版，相应的 V 代表竖版

 字体设置
 参数一：新建好的字体；参数二：字体大小，参数三：字体样式，多个样式用“|”分隔
 `Font topfont = new Font(bfChinese,14，Font.BOLD);`  
 `Font textfont =new Font(bfChinese,10，,Font.BOLD|Font.UNDERLINE);`

### 2）添加文本的对象：块、短句和段落
- `Chunk`：块(Chunk)是能被添加到文档的文本的最小单位。
- `Phrase`：短句（Phrase）是一系列以特定间距（两行之间的距离）作为参数的块。
- `Paragraph`：段落是一系列块和（或）短句。同短句一样，段落有确定的间距。用户还可以指定缩排；在边和（或）右边保留一定空白，段落可以 **左对齐**、**右对齐** 和 **居中对齐**。添加到文档中的每一个段落将自动另起一行。
### 3）步骤2书写器创建之后，步骤3文档打开之前
 以下项只可在文档关闭状态执行 ,包括 **水印**、**页眉**、**页脚**

 **水印**
 `Watermark`内部类，需要继承 `PdfPageEventHelper`类
 `writer.setPageEvent(new Watermark());`

 **页眉/页脚**
 iText5中并没有之前版本HeaderFooter对象设置页眉和页脚，可以利用PdfPageEvent来完成页眉页脚的设置工作。
 PdfPageEvent提供了几个pdf在创建时的事件，页眉页脚就是在每页加载完写入的。
 每一页加个页码还是很简单的，但是 **总页码** 就麻烦了，**iText是流模式的写入内容，只有写到最后，才能知道有多少页**，那么显示总页数就麻烦了，不过麻烦不代表不可能。
 其实iText仅在调用释放模板方法后才将PdfTemplate写入到OutputStream中，否则对象将一直保存在内存中，直到关闭文档。
 所以我们可以在最后关闭文档前，使用PdfTemplate写入总页码。可以理解成先写个占位符，然后统一替换。
### 4）设置文档属性  (与文档是否打开没有关联)
 `document.addTitle(“Title@PDF-Java”);`// 标题  
 `document.addAuthor(“Author@umiz”);`// 作者  
 `document.addSubject(“Subject@iText pdf sample”);`// 主题  
 `document.addKeywords(“Keywords@iTextpdf”);`// 关键字  
 `document.addCreator(“Creator@umizs”);`// 创建者  
## 4：文档内容
### 1）段落Paragraph
```java
Paragraph pt=new Paragraph(name,headfont);//设置字体样式
 pt.setAlignment(1);//设置文字居中 0靠左   1，居中     2，靠右
 pt.setIndentationLeft(12);// 左缩进  
 pt.setIndentationRight(12);// 右缩进  
 pt.setFirstLineIndent(24);// 首行缩进 
 paragraph.setLeading(20f); //行间距
 paragraph.setSpacingBefore(5f); //设置段落上空白
 paragraph.setSpacingAfter(10f); //设置段落下空白
```
### 2）表格table
```java
 Table table =new Table(3);//括号参数表示列
 int width[] = {10,45,45};//设置每列宽度比例   
 table.setWidths(width);   
 table.setWidth(95);//占页面宽度比例
 table.setAlignment(Element.ALIGN_CENTER);//居中    
 table.setAutoFillEmptyCells(true);//自动填满       
 table.setBorderWidth((float)0.1);//表格边框线条宽度    
 table.setPadding(1);//边距:单元格的边线与单元格内容的边距  
 table.setSpacing(0);//间距：单元格与单元格之间的距离
 table.addCell(new Paragraph(“name”),textfont));//添加单元格内容
 table.endHeaders();//每页都会显示表头
```

### 3）单元格内容样式cell 
```java
 Cell cell=new Cell(new Paragraph(“序号”,keyfont));
 cell.setHorizontalAlignment(Element.ALIGN_CENTER);//水平居中
 cell.setVerticalAlignment(Element.ALIGN_MIDDLE); //垂直居中   
 table.addCell(cell);
```
### 4）表格嵌套 
```java
   最外层表格
 PdfPTable table =new PdfPTable(3);
 table.setTotalWidth(300);
 table.setLockedWidth(true);

PdfPCell cell；
 cell =new PdfPCell(new Phrase(“Table 5”));
 cell.setColspan(3);
 cell.setBorderWidth(0);//设置表格的边框宽度为0
 table.addCell(cell);

  嵌套表格
 PdfPTable celltable =new PdfPTable(2);
 cell =new PdfPCell(celltable);
 cell.setRowspan(2);
 cell.setBorderWidth(1);//设置表格的边框宽度为1
 cell.setPadding(10);//设置表格与上一个表格的填充为10
 table.addCell(cell);
```
### 5）直线  
```java
 Paragraph p1 =new Paragraph();  
 p1.add(new Chunk(new LineSeparator()));   
 doc.add(p1);  
```
### 6）点线 
```java
 Paragraph p2 =new Paragraph();  
 p2.add(new Chunk(new DottedLineSeparator()));
```
### 7）超链接
```java
 Anchor anchor =new Anchor(“this is anchor”);
```
### 8）定位  

```java
 点击后，跳到 `topline` 的位置
 Anchor gotop =new Anchor(“go top”);
 gotop.setReference(“#us”);
```
### 9）添加图片
```java
 Image image =Image.getInstance(imgPath);
 image.setAlignment(Image.ALIGN_CENTER);
 image.scalePercent(40);//依照比例缩放
```

## 5：代码展示
### 1）基本代码demo
```java
package com.xiaoze.exer;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.DottedLineSeparator;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.File;
import java.io.FileOutputStream;

public class PdfReport {

    // main测试
    public static void main(String[] args) throws Exception {
        try {
            // 1.新建document对象
            Document document = new Document(PageSize.A4);// 建立一个Document对象

            // 2.建立一个书写器(Writer)与document对象关联
            File file = new File("D:\\PDFDemo.pdf");
            file.createNewFile();
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            writer.setPageEvent(new Watermark("HELLO ITEXTPDF"));// 水印
			writer.setPageEvent(new MyHeaderFooter());// 页眉/页脚

            // 3.打开文档
            document.open();
			document.addTitle("Title@PDF-Java");// 标题
			document.addAuthor("Author@umiz");// 作者
			document.addSubject("Subject@iText pdf sample");// 主题
			document.addKeywords("Keywords@iTextpdf");// 关键字
			document.addCreator("Creator@umiz`s");// 创建者

            // 4.向文档中添加内容
            new PdfReport().generatePDF(document);

            // 5.关闭文档
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 定义全局的字体静态变量
	private static Font titlefont;
	private static Font headfont;
	private static Font keyfont;
	private static Font textfont;
    // 最大宽度
	private static int maxWidth = 520;
	// 静态代码块
    static {
        try {
            // 不同字体（这里定义为同一种字体：包含不同字号、不同style）
            BaseFont bfChinese = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
            titlefont = new Font(bfChinese, 16, Font.BOLD);
            headfont = new Font(bfChinese, 14, Font.BOLD);
            keyfont = new Font(bfChinese, 10, Font.BOLD);
            textfont = new Font(bfChinese, 10, Font.NORMAL);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 生成PDF文件
	public void generatePDF(Document document) throws Exception {


    	// 段落
		Paragraph paragraph = new Paragraph("美好的一天从早起开始！", titlefont);
		paragraph.setAlignment(1); //设置文字居中 0靠左   1，居中     2，靠右
		paragraph.setIndentationLeft(12); //设置左缩进
		paragraph.setIndentationRight(12); //设置右缩进
		paragraph.setFirstLineIndent(24); //设置首行缩进
		paragraph.setLeading(20f); //行间距
		paragraph.setSpacingBefore(5f); //设置段落上空白
		paragraph.setSpacingAfter(10f); //设置段落下空白

		// 方式三：使用iTextAsian.jar中的字体
		BaseFont baseFont = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
		// 块
		Chunk chunk = new Chunk("下标");
		// 设置字体，字体定宽
		chunk.setFont(new Font(baseFont));
		// 设置背景颜色
		chunk.setBackground(new BaseColor(0xFF, 0xFF, 0x00));
		// 设置上表下标
		chunk.setTextRise(-3f);

		paragraph.add(chunk);
		// 直线
		Paragraph p1 = new Paragraph();
		p1.add(new Chunk(new LineSeparator()));

		// 点线
		Paragraph p2 = new Paragraph();
		p2.add(new Chunk(new DottedLineSeparator()));

		// 超链接
		Anchor anchor = new Anchor("baidu");
		anchor.setReference("www.baidu.com");

		// 定位
		Anchor gotoP = new Anchor("goto");
		gotoP.setReference("#top");

		// 添加图片
		Image image = Image.getInstance("C:\\Users\\dell\\Pictures\\Camera Roll\\3.jpg");
		image.setAlignment(Image.ALIGN_CENTER);
		image.scalePercent(40); //依照比例缩放

		// 表格
		PdfPTable table = createTable(new float[] { 40, 120, 120, 120, 80, 80 });
		table.addCell(createCell("美好的一天", headfont, Element.ALIGN_LEFT, 6, false));
		table.addCell(createCell("早上9:00", keyfont, Element.ALIGN_CENTER));
		table.addCell(createCell("中午11:00", keyfont, Element.ALIGN_CENTER));
		table.addCell(createCell("中午13:00", keyfont, Element.ALIGN_CENTER));
		table.addCell(createCell("下午15:00", keyfont, Element.ALIGN_CENTER));
		table.addCell(createCell("下午17:00", keyfont, Element.ALIGN_CENTER));
		table.addCell(createCell("晚上19:00", keyfont, Element.ALIGN_CENTER));
		Integer totalQuantity = 0;
		for (int i = 0; i < 5; i++) {
			table.addCell(createCell("起床", textfont));
			table.addCell(createCell("吃午饭", textfont));
			table.addCell(createCell("午休", textfont));
			table.addCell(createCell("下午茶", textfont));
			table.addCell(createCell("回家", textfont));
			table.addCell(createCell("吃晚饭", textfont));
			totalQuantity ++;
		}
		table.addCell(createCell("总计", keyfont));
		table.addCell(createCell("", textfont));
		table.addCell(createCell("", textfont));
		table.addCell(createCell("", textfont));
		table.addCell(createCell(String.valueOf(totalQuantity) + "件事", textfont));
		table.addCell(createCell("", textfont));


		document.add(paragraph);
		document.add(anchor);
		document.add(p2);
		document.add(gotoP);
		document.add(p1);
		document.add(table);
		document.add(image);
	}


/**------------------------创建表格单元格的方法start----------------------------*/
    /**
     * 创建单元格(指定字体)
     * @param value
     * @param font
     * @return
     */
    public PdfPCell createCell(String value, Font font) {
        PdfPCell cell = new PdfPCell();
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPhrase(new Phrase(value, font));
        return cell;
    }
    /**
     * 创建单元格（指定字体、水平..）
     * @param value
     * @param font
     * @param align
     * @return
     */
	public PdfPCell createCell(String value, Font font, int align) {
		PdfPCell cell = new PdfPCell();
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cell.setHorizontalAlignment(align);
		cell.setPhrase(new Phrase(value, font));
		return cell;
	}
    /**
     * 创建单元格（指定字体、水平居..、单元格跨x列合并）
     * @param value
     * @param font
     * @param align
     * @param colspan
     * @return
     */
    public PdfPCell createCell(String value, Font font, int align, int colspan) {
        PdfPCell cell = new PdfPCell();
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setHorizontalAlignment(align);
        cell.setColspan(colspan);
        cell.setPhrase(new Phrase(value, font));
        return cell;
    }
    /**
     * 创建单元格（指定字体、水平居..、单元格跨x列合并、设置单元格内边距）
     * @param value
     * @param font
     * @param align
     * @param colspan
     * @param boderFlag
     * @return
     */
    public PdfPCell createCell(String value, Font font, int align, int colspan, boolean boderFlag) {
        PdfPCell cell = new PdfPCell();
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setHorizontalAlignment(align);
        cell.setColspan(colspan);
        cell.setPhrase(new Phrase(value, font));
        cell.setPadding(3.0f);
        if (!boderFlag) {
            cell.setBorder(0);
            cell.setPaddingTop(15.0f);
            cell.setPaddingBottom(8.0f);
        } else if (boderFlag) {
            cell.setBorder(0);
            cell.setPaddingTop(0.0f);
            cell.setPaddingBottom(15.0f);
        }
        return cell;
    }
    /**
     * 创建单元格（指定字体、水平..、边框宽度：0表示无边框、内边距）
     * @param value
     * @param font
     * @param align
     * @param borderWidth
     * @param paddingSize
     * @param flag
     * @return
     */
	public PdfPCell createCell(String value, Font font, int align, float[] borderWidth, float[] paddingSize, boolean flag) {
		PdfPCell cell = new PdfPCell();
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cell.setHorizontalAlignment(align);
		cell.setPhrase(new Phrase(value, font));
		cell.setBorderWidthLeft(borderWidth[0]);
		cell.setBorderWidthRight(borderWidth[1]);
		cell.setBorderWidthTop(borderWidth[2]);
		cell.setBorderWidthBottom(borderWidth[3]);
		cell.setPaddingTop(paddingSize[0]);
		cell.setPaddingBottom(paddingSize[1]);
		if (flag) {
			cell.setColspan(2);
		}
		return cell;
	}
/**------------------------创建表格单元格的方法end----------------------------*/


/**--------------------------创建表格的方法start------------------- ---------*/
    /**
     * 创建默认列宽，指定列数、水平(居中、右、左)的表格
     * @param colNumber
     * @param align
     * @return
     */
	public PdfPTable createTable(int colNumber, int align) {
		PdfPTable table = new PdfPTable(colNumber);
		try {
			table.setTotalWidth(maxWidth);
			table.setLockedWidth(true);
			table.setHorizontalAlignment(align);
			table.getDefaultCell().setBorder(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return table;
	}
    /**
     * 创建指定列宽、列数的表格
     * @param widths
     * @return
     */
	public PdfPTable createTable(float[] widths) {
		PdfPTable table = new PdfPTable(widths);
		try {
			table.setTotalWidth(maxWidth);
			table.setLockedWidth(true);
			table.setHorizontalAlignment(Element.ALIGN_CENTER);
			table.getDefaultCell().setBorder(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return table;
	}
    /**
     * 创建空白的表格
     * @return
     */
	public PdfPTable createBlankTable() {
		PdfPTable table = new PdfPTable(1);
		table.getDefaultCell().setBorder(0);
		table.addCell(createCell("", keyfont));
		table.setSpacingAfter(20.0f);
		table.setSpacingBefore(20.0f);
		return table;
	}
/**--------------------------创建表格的方法end------------------- ---------*/


}
```
增加页脚页眉，总页数
```java
package com.xiaoze.exer;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import java.io.IOException;

public class MyHeaderFooter extends PdfPageEventHelper {
    // 总页数
    PdfTemplate totalPage;
    Font hfFont;
    {
        try {
            hfFont = new Font(BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED), 8, Font.NORMAL);
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 打开文档时，创建一个总页数的模版
    public void onOpenDocument(PdfWriter writer, Document document) {
        PdfContentByte cb =writer.getDirectContent();
        totalPage = cb.createTemplate(30, 16);
    }
    // 一页加载完成触发，写入页眉和页脚
    public void onEndPage(PdfWriter writer, Document document) {
        PdfPTable table = new PdfPTable(3);
        try {
            table.setTotalWidth(PageSize.A4.getWidth() - 100);
            table.setWidths(new int[] { 24, 24, 3});
            table.setLockedWidth(true);
            table.getDefaultCell().setFixedHeight(-10);
            table.getDefaultCell().setBorder(Rectangle.BOTTOM);

            table.addCell(new Paragraph("我是页眉/页脚", hfFont));// 可以直接使用addCell(str)，不过不能指定字体，中文无法显示
            table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(new Paragraph("第" + writer.getPageNumber() + "页/", hfFont));
            // 总页数
            PdfPCell cell = new PdfPCell(Image.getInstance(totalPage));
            cell.setBorder(Rectangle.BOTTOM);
            table.addCell(cell);
            // 将页眉写到document中，位置可以指定，指定到下面就是页脚
            table.writeSelectedRows(0, -1, 50,PageSize.A4.getHeight() - 20, writer.getDirectContent());
        } catch (Exception de) {
            throw new ExceptionConverter(de);
        }
    }

    // 全部完成后，将总页数的pdf模版写到指定位置
    public void onCloseDocument(PdfWriter writer,Document document) {
        String text = "总" + (writer.getPageNumber()) + "页";
        ColumnText.showTextAligned(totalPage, Element.ALIGN_LEFT, new Paragraph(text,hfFont), 2, 2, 0);
    }

}
```
增加水印
```java
package com.xiaoze.exer;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class Watermark extends PdfPageEventHelper {
    Font FONT = new Font(Font.FontFamily.HELVETICA, 30, Font.BOLD, new GrayColor(0.95f));
    private String waterCont;//水印内容
    public Watermark() {

    }
    public Watermark(String waterCont) {
        this.waterCont = waterCont;
    }

    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        for(int i=0 ; i<5; i++) {
            for(int j=0; j<5; j++) {
                ColumnText.showTextAligned(writer.getDirectContentUnder(),
                        Element.ALIGN_CENTER,
                        new Phrase(this.waterCont == null ? "HELLO WORLD" : this.waterCont, FONT),
                        (50.5f+i*350),
                        (40.0f+j*150),
                        writer.getPageNumber() % 2 == 1 ? 45 : -45);
            }
        }
    }
}
```
![Alt text](./img/image5.png)
