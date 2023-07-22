<template><div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2>
<h3 id="_1-创建数据库" tabindex="-1"><a class="header-anchor" href="#_1-创建数据库" aria-hidden="true">#</a> 1：创建数据库</h3>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>命令行创建：mysqladmin -u root -p create 数据库名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-删除数据库" tabindex="-1"><a class="header-anchor" href="#_2-删除数据库" aria-hidden="true">#</a> 2：删除数据库</h3>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>命令行创建：mysqladmin -u root -p drop  数据库名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-选择数据库" tabindex="-1"><a class="header-anchor" href="#_3-选择数据库" aria-hidden="true">#</a> 3：选择数据库</h3>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>进入数据库：mysql -u root -p
使用数据库：use 数据库名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-数据类型" tabindex="-1"><a class="header-anchor" href="#_4-数据类型" aria-hidden="true">#</a> 4：数据类型</h3>
<ul>
<li>MySQL 中定义数据字段的类型对数据库的优化是非常重要的。</li>
<li>MySQL 支持多种类型，大致可以分为三类：<strong>数值</strong>、<strong>日期/时间</strong> 和 <strong>字符串(字符)</strong> 类型。</li>
</ul>
<h4 id="_4-1-数值类型" tabindex="-1"><a class="header-anchor" href="#_4-1-数值类型" aria-hidden="true">#</a> 4.1 数值类型</h4>
<ul>
<li>MySQL 支持所有标准 SQL 数值数据类型。</li>
<li>这些类型包括严格数值数据类型( <code v-pre>INTEGER</code>、<code v-pre>SMALLINT</code>、<code v-pre>DECIMAL</code> 和 <code v-pre>NUMERIC</code> )，以及近似数值数据类型( <code v-pre>FLOAT</code>、<code v-pre>REAL</code> 和 <code v-pre>DOUBLE</code> <code v-pre>PRECISION</code> )。</li>
<li>关键字 <code v-pre>INT</code> 是 <code v-pre>INTEGER</code> 的同义词，关键字 <code v-pre>DEC</code> 是 <code v-pre>DECIMAL</code> 的同义词。</li>
<li><code v-pre>BIT</code>数据类型保存位字段值，并且支持 MyISAM、MEMORY、InnoDB 和 BDB 表。</li>
<li>作为 SQL 标准的扩展，MySQL 也支持整数类型 <code v-pre>TINYINT</code>、<code v-pre>MEDIUMINT</code> 和 <code v-pre>BIGINT</code>。下面的表显示了需要的每个整数类型的存储和范围。</li>
</ul>
<table>
<thead>
<tr>
<th>类型</th>
<th>大小</th>
<th>范围(有符号)</th>
<th>范围(无符号)</th>
<th>用途</th>
</tr>
</thead>
<tbody>
<tr>
<td>TINYINT</td>
<td>1 字节</td>
<td>(-128，127)</td>
<td>(0，255)</td>
<td>小整数值</td>
</tr>
<tr>
<td>SMALLINT</td>
<td>2 字节</td>
<td>(-32768，32767)</td>
<td>(0，65535)</td>
<td>大整数值</td>
</tr>
<tr>
<td>MEDIUMINT</td>
<td>3 字节</td>
<td>(-8 388 608，8 388 607)</td>
<td>(0，16 777 215)</td>
<td>大整数值</td>
</tr>
<tr>
<td>INT或INTEGER</td>
<td>4 字节</td>
<td>(-2 147 483 648，2 147 483 647)</td>
<td>(0，4 294 967 295)</td>
<td>大整数值</td>
</tr>
<tr>
<td>BIGINT</td>
<td>8 字节</td>
<td>(-9 233 372 036 854 775 808，9 223 372 036 854 775 807)</td>
<td>(0，18 446 744 073 709 551 615)</td>
<td>极大整数值</td>
</tr>
<tr>
<td>FLOAT</td>
<td>4 字节</td>
<td>(-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38)</td>
<td>0，(1.175 494 351 E-38，3.402 823 466 E+38)</td>
<td>单精度 浮点数值</td>
</tr>
<tr>
<td>DOUBLE</td>
<td>8 字节</td>
<td>(-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)</td>
<td>0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)</td>
<td>双精度 浮点数值</td>
</tr>
<tr>
<td>DECIMAL</td>
<td>对DECIMAL(M,D) ，如果M&gt;D，为M+2否则为D+2</td>
<td>依赖于M和D的值</td>
<td>依赖于M和D的值</td>
<td>小数值</td>
</tr>
</tbody>
</table>
<hr>
<h4 id="_4-2-日期和时间类型" tabindex="-1"><a class="header-anchor" href="#_4-2-日期和时间类型" aria-hidden="true">#</a> 4.2 日期和时间类型</h4>
<ul>
<li>表示时间值的日期和时间类型为 <code v-pre>DATETIME</code>、<code v-pre>DATE</code>、<code v-pre>TIMESTAMP</code>、<code v-pre>TIME</code> 和 <code v-pre>YEAR</code>。</li>
<li>每个时间类型有一个有效值范围和一个&quot;零&quot;值，当指定不合法的 MySQL 不能表示的值时使用&quot;零&quot;值。</li>
<li><code v-pre>TIMESTAMP</code> 类型有专有的自动更新特性，将在后面描述。</li>
</ul>
<table>
<thead>
<tr>
<th>类型</th>
<th>大小(字节)</th>
<th>范围</th>
<th>格式</th>
<th>用途</th>
</tr>
</thead>
<tbody>
<tr>
<td>DATE</td>
<td>3</td>
<td>1000-01-01/9999-12-31</td>
<td>YYYY-MM-DD</td>
<td>日期值</td>
</tr>
<tr>
<td>TIME</td>
<td>3</td>
<td>'-838:59:59'/'838:59:59'</td>
<td>HH:MM:SS</td>
<td>时间值或持续时间</td>
</tr>
<tr>
<td>YEAR</td>
<td>1</td>
<td>1901/2155</td>
<td>YYYY</td>
<td>年份值</td>
</tr>
<tr>
<td>DATETIME</td>
<td>8</td>
<td>1000-01-01 00:00:00/9999-12-31 23:59:59</td>
<td>YYYY-MM-DD HH:MM:SS</td>
<td>混合日期和时间值</td>
</tr>
<tr>
<td>TIMESTAMP</td>
<td>4</td>
<td>1970-01-01 00:00:00/2038 结束时间是第 2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038-1-19 03:14:07</td>
<td>YYYYMMDD HHMMSS</td>
<td>混合日期和时间值，时间戳</td>
</tr>
</tbody>
</table>
<hr>
<h4 id="_4-3-字符串类型" tabindex="-1"><a class="header-anchor" href="#_4-3-字符串类型" aria-hidden="true">#</a> 4.3 字符串类型</h4>
<p>字符串类型指 <code v-pre>CHAR</code>、<code v-pre>VARCHAR</code>、<code v-pre>BINARY</code>、<code v-pre>VARBINARY</code>、<code v-pre>BLOB</code>、<code v-pre>TEXT</code>、<code v-pre>ENUM</code> 和 <code v-pre>SET</code>。该节描述了这些类型如何工作以及如何在查询中使用这些类型。</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>大小</th>
<th>用途</th>
</tr>
</thead>
<tbody>
<tr>
<td>CHAR</td>
<td>0-255字节</td>
<td>定长字符串</td>
</tr>
<tr>
<td>VARCHAR</td>
<td>0-65535 字节</td>
<td>变长字符串</td>
</tr>
<tr>
<td>TINYBLOB</td>
<td>0-255字节</td>
<td>不超过 255 个字符的二进制字符串</td>
</tr>
<tr>
<td>TINYTEXT</td>
<td>0-255字节</td>
<td>短文本字符串</td>
</tr>
<tr>
<td>BLOB</td>
<td>0-65 535字节</td>
<td>二进制形式的长文本数据</td>
</tr>
<tr>
<td>TEXT</td>
<td>0-65 535字节</td>
<td>长文本数据</td>
</tr>
<tr>
<td>MEDIUMBLOB</td>
<td>0-16 777 215字节</td>
<td>二进制形式的中等长度文本数据</td>
</tr>
<tr>
<td>MEDIUMTEXT</td>
<td>0-16 777 215字节</td>
<td>中等长度文本数据</td>
</tr>
<tr>
<td>LONGBLOB</td>
<td>0-4 294 967 295字节</td>
<td>二进制形式的极大文本数据</td>
</tr>
<tr>
<td>LONGTEXT</td>
<td>0-4 294 967 295字节</td>
<td>极大文本数据</td>
</tr>
</tbody>
</table>
<p>::: warning 提示</p>
<ul>
<li>
<p><code v-pre>CHAR</code> 和 <code v-pre>VARCHAR</code> 类型类似，但它们保存和检索的方式不同。它们的最大长度和是否尾部空格被保留等方面也不同。在存储或检索过程中不进行大小写转换。</p>
</li>
<li>
<p><code v-pre>BINARY</code> 和 <code v-pre>VARBINARY</code> 类类似于 <code v-pre>CHAR</code> 和 <code v-pre>VARCHAR</code>，不同的是它们包含二进制字符串而不要非二进制字符串。也就是说，它们包含字节字符串而不是字符字符串。这说明它们没有字符集，并且排序和比较基于列值字节的数值值。</p>
</li>
<li>
<p><code v-pre>BLOB</code> 是一个二进制大对象，可以容纳可变数量的数据。有 4 种 <code v-pre>BLOB</code> 类型：<code v-pre>TINYBLOB</code>、<code v-pre>BLOB</code>、MEDIUMBLOB 和 LONGBLOB。它们只是可容纳值的最大长度不同。</p>
</li>
<li>
<p>有 4 种 <code v-pre>TEXT</code> 类型：<code v-pre>TINYTEXT</code>、<code v-pre>TEXT</code>、<code v-pre>MEDIUMTEXT</code> 和 <code v-pre>LONGTEXT</code>。这些对应 4 种<code v-pre>BLOB</code> 类型，有相同的最大长度和存储需求。
:::</p>
</li>
</ul>
<h3 id="_5-创建数据表" tabindex="-1"><a class="header-anchor" href="#_5-创建数据表" aria-hidden="true">#</a> 5：创建数据表</h3>
<p>创建MySQL数据表需要以下信息：</p>
<ul>
<li>表名</li>
<li>表字段名</li>
<li>定义每个表字段</li>
</ul>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>CREATE TABLE IF NOT EXISTS tutorials_tbl(
   tutorial_id INT NOT NULL AUTO_INCREMENT,
   tutorial_title VARCHAR(100) NOT NULL,
   tutorial_author VARCHAR(40) NOT NULL,
   submission_date DATE,
   PRIMARY KEY ( tutorial_id )
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-删除数据表" tabindex="-1"><a class="header-anchor" href="#_6-删除数据表" aria-hidden="true">#</a> 6：删除数据表</h3>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>DROP TABLE table_name ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-插入数据" tabindex="-1"><a class="header-anchor" href="#_7-插入数据" aria-hidden="true">#</a> 7：插入数据</h3>
<p>MySQL 表中使用 <code v-pre>INSERT INTO SQL</code>语句来插入数据。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-查询数据" tabindex="-1"><a class="header-anchor" href="#_8-查询数据" aria-hidden="true">#</a> 8：查询数据</h3>
<p>MySQL 数据库使用<code v-pre>SQL SELECT</code>语句来查询数据。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[OFFSET M ][LIMIT N]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。</li>
<li><code v-pre>SELECT</code> 命令可以读取一条或者多条记录。</li>
<li>你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据</li>
<li>你可以使用 <code v-pre>WHERE</code> 语句来包含任何条件。</li>
<li>你可以通过<code v-pre>OFFSET</code>指定<code v-pre>SELECT</code>语句开始查询的数据偏移量。默认情况下偏移量为0。</li>
<li>你可以使用 <code v-pre>LIMIT</code> 属性来设定返回的记录数。</li>
</ul>
<h3 id="_9-where字句" tabindex="-1"><a class="header-anchor" href="#_9-where字句" aria-hidden="true">#</a> 9：where字句</h3>
<p>MySQL 表中使用 <code v-pre>INSERT INTO SQL</code>语句来插入数据。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。</li>
<li>你可以在WHERE子句中指定任何条件。</li>
<li>你可以使用AND或者OR指定一个或多个条件。</li>
<li>WHERE子句也可以运用于SQL的 DELETE 或者 UPDATE 命令。</li>
<li>WHERE 子句类似于程序语言中的if条件，根据 MySQL 表中的字段值来读取指定的数据。</li>
</ul>
<h3 id="_10-update查询" tabindex="-1"><a class="header-anchor" href="#_10-update查询" aria-hidden="true">#</a> 10：update查询</h3>
<p>如果我们需要修改或更新MySQL中的数据，我们可以使用 <code v-pre>SQL UPDATE</code> 命令来操作。.</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>你可以同时更新一个或多个字段。</li>
<li>你可以在 WHERE 子句中指定任何条件。</li>
<li>你可以在一个单独表中同时更新数据。</li>
</ul>
<h3 id="_11-delete语句" tabindex="-1"><a class="header-anchor" href="#_11-delete语句" aria-hidden="true">#</a> 11：delete语句</h3>
<p>你可以使用 SQL 的 <code v-pre>DELETE FROM</code> 命令来删除 MySQL 数据表中的记录。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>DELETE FROM table_name [WHERE Clause]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>如果没有指定 WHERE 子句，MySQL表中的所有记录将被删除。</li>
<li>你可以在 WHERE 子句中指定任何条件</li>
<li>您可以在单个表中一次性删除记录。</li>
</ul>
<h3 id="_12-like字句" tabindex="-1"><a class="header-anchor" href="#_12-like字句" aria-hidden="true">#</a> 12：like字句</h3>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT field1, field2,...fieldN 
FROM table_name1, table_name2...
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_13-排序" tabindex="-1"><a class="header-anchor" href="#_13-排序" aria-hidden="true">#</a> 13：排序</h3>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。</li>
<li>你可以设定多个字段来排序。</li>
<li>你可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升排列。</li>
<li>你可以添加 WHERE...LIKE 子句来设置条件。</li>
</ul>
<h3 id="_14-分组" tabindex="-1"><a class="header-anchor" href="#_14-分组" aria-hidden="true">#</a> 14：分组</h3>
<p>在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15-连接的使用" tabindex="-1"><a class="header-anchor" href="#_15-连接的使用" aria-hidden="true">#</a> 15：连接的使用</h3>
<ul>
<li>INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。</li>
<li>LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。</li>
<li>RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。</li>
</ul>
<p><a href="https://www.w3cschool.cn/mysql/func-date-add.html" target="_blank" rel="noopener noreferrer">具体学习链接</a></p>
<h3 id="_16-null值处理" tabindex="-1"><a class="header-anchor" href="#_16-null值处理" aria-hidden="true">#</a> 16：NULL值处理</h3>
<ul>
<li>IS NULL: 当列的值是NULL,此运算符返回true。</li>
<li>IS NOT NULL: 当列的值不为NULL, 运算符返回true。</li>
</ul>
<p>::: warning 注意
关于 NULL 的条件比较运算是比较特殊的。你不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。</p>
<p>在MySQL中，NULL值与任何其它值的比较（即使是NULL）永远返回false，即 NULL = NULL 返回false 。</p>
<p>MySQL中处理NULL使用IS NULL和IS NOT NULL运算符。
:::</p>
<h3 id="_17-正则表达式" tabindex="-1"><a class="header-anchor" href="#_17-正则表达式" aria-hidden="true">#</a> 17：正则表达式</h3>
<p><img src="@source/blogs/数据库/img/mysql/1.png" alt="正则表达式配置"></p>
<blockquote>
<p>查找name字段中以'st'为开头的所有数据：</p>
</blockquote>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code> SELECT name FROM person_tbl WHERE name REGEXP '^st';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>查找name字段中以'ok'为结尾的所有数据：</p>
</blockquote>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code> SELECT name FROM person_tbl WHERE name REGEXP 'ok$';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>查找name字段中包含'mar'字符串的所有数据：</p>
</blockquote>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>  SELECT name FROM person_tbl WHERE name REGEXP 'mar';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>查找name字段中以元音字符开头或以'ok'字符串结尾的所有数据：</p>
</blockquote>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>  SELECT name FROM person_tbl WHERE name REGEXP '^[aeiou]|ok$';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_18-事务" tabindex="-1"><a class="header-anchor" href="#_18-事务" aria-hidden="true">#</a> 18：事务</h3>
<p>1、<code v-pre>原子性</code>：一组事务，要么成功；要么撤回，即事务在执行过程中出错会回滚到事务开始前的状态。<br>
2、<code v-pre>一致性</code> ： 一个事务不论是开始前还是结束后，数据库的完整性都没有被破坏。因此写入的数据必须完全符合所有预设规则（资料精确度、串联性以及后续数据库能够自发完成预定工作）。<br>
3、<code v-pre>隔离性</code>：数据库允许多个事务并发的同时对其数据进行读写修改等操作，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离可分为：Read uncommitted（读未提交）、Read committed（读提交）、Repeatable read（可重复读）、Serializable（串行化）。<br>
4、<code v-pre>持久性</code>：事务在处理结束后对数据做出的修改是永久的，无法丢失。</p>
<p><a href="https://www.w3cschool.cn/mysql/mysql-transaction.html" target="_blank" rel="noopener noreferrer">具体学习链接</a></p>
<h3 id="_19-alter命令" tabindex="-1"><a class="header-anchor" href="#_19-alter命令" aria-hidden="true">#</a> 19：alter命令</h3>
<p><a href="https://www.w3cschool.cn/mysql/mysql-alter.html" target="_blank" rel="noopener noreferrer">具体学习链接</a></p>
<h3 id="_20-索引" tabindex="-1"><a class="header-anchor" href="#_20-索引" aria-hidden="true">#</a> 20：索引</h3>
<p><a href="https://www.w3cschool.cn/mysql/mysql-index.html" target="_blank" rel="noopener noreferrer">具体学习链接</a></p>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<p><a href="https://www.w3cschool.cn/mysql/func-date-add.html" target="_blank" rel="noopener noreferrer">具体学习链接</a></p>
</div></template>


