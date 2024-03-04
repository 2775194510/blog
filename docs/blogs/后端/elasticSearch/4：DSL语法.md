---
title: 4：DSL语法
date: 2024-03-04
keys: 
  - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - 后端
tags:
  - elasticSearch
---

## 索引库操作

`索引库` 就类似 `数据库表`，`mapping映射` 就类似 `表的结构`。

我们要向 `es` 中存储数据，必须先 **创建“库”和“表”。**

### 1：mapping映射属性

`mapping` 是对 `索引库` 中 `文档` 的约束，常见的 `mapping` 属性包括：

- `type`：字段数据类型，常见的简单类型有：
  - **字符串** ：`text`（可分词的文本）、`keyword`（精确值，例如：品牌、国家、ip地址）
  - **数值** ：`long`、`integer`、`short`、`byte`、`double`、`float`、
  - **布尔** ：`boolean`
  - **日期** ：`date`
  - **对象** ：`object`
- `index`：是否创建索引，**默认为true**
- `analyzer`：使用哪种分词器
- `properties`：该字段的子字段


例如下面的 `json` 文档：

```json
{
    "age": 21,
    "weight": 52.1,
    "isMarried": false,
    "info": "黑马程序员Java讲师",
    "email": "zy@itcast.cn",
    "score": [99.1, 99.5, 98.9],
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

> 对应的每个字段映射（mapping）：

- `age`：类型为 **integer**；参与搜索，**因此需要index为true；无需分词器**
- `weight`：类型为 **float**；参与搜索，**因此需要index为true；无需分词器**
- `isMarried`：类型为 **boolean**；参与搜索，**因此需要index为true；无需分词器**
- `info`：类型为 **字符串**，需要分词，因此是text；参与搜索，因此需要index为true；分词器可以用 **ik_smart**
- `email`：类型为 **字符串** ，但是不需要分词，因此是keyword；不参与搜索，因此需要index为false；无需分词器
- `score`：虽然是 **数组**，但是我们只看元素的类型，类型为float；参与搜索，因此需要index为true；无需分词器
- `name`：类型为 **object**，需要定义多个子属性
  - `name.firstName`；类型为 **字符串**，但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器
  - `name.lastName`；类型为 **字符串**，但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器


### 2：索引库的CRUD

### 2.1 创建索引库和映射

#### 基本语法：

- **请求方式**：PUT
- **请求路径**：/索引库名，可以自定义
- **请求参数**：mapping映射

格式：

```json
PUT /索引库名称
{
  "mappings": {
    "properties": {
      "字段名":{
        "type": "text",
        "analyzer": "ik_smart"
      },
      "字段名2":{
        "type": "keyword",
        "index": "false"
      },
      "字段名3":{
        "properties": {
          "子字段": {
            "type": "keyword"
          }
        }
      },
      // ...略
    }
  }
}
```

#### 示例：

```json
PUT /heima
{
  "mappings": {
    "properties": {
      "info":{
        "type": "text",
        "analyzer": "ik_smart"
      },
      "email":{
        "type": "keyword",
        "index": "falsae"
      },
      "name":{
        "properties": {
          "firstName": {
            "type": "keyword"
          }
        }
      },
      // ... 略
    }
  }
}
```

### 2.2 查询索引库

**基本语法**：

- 请求方式：GET

- 请求路径：/索引库名

- 请求参数：无

**格式**：

```
GET /索引库名
```
### 2.3 修改索引库

倒排索引结构虽然不复杂，但是一旦数据结构改变（比如改变了分词器），就需要重新创建倒排索引，这简直是灾难。因此索引库**一旦创建，无法修改mapping**。

虽然无法修改mapping中已有的字段，但是却允许添加新的字段到mapping中，因为不会对倒排索引产生影响。

**语法说明**：

```json
PUT /索引库名/_mapping
{
  "properties": {
    "新字段名":{
      "type": "integer"
    }
  }
}
```

### 2.4 删除索引库

**语法：**

- 请求方式：DELETE

- 请求路径：/索引库名

- 请求参数：无

**格式：**

```
DELETE /索引库名
```

### 2.5 总结

索引库操作有哪些？

- 创建索引库：PUT /索引库名
- 查询索引库：GET /索引库名
- 删除索引库：DELETE /索引库名
- 添加字段：PUT /索引库名/_mapping

## 文档操作

### 1：新增文档

**语法：**

```json
POST /索引库名/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    "字段3": {
        "子属性1": "值3",
        "子属性2": "值4"
    },
    // ...
}
```

**示例：**

```json
POST /heima/_doc/1
{
    "info": "黑马程序员Java讲师",
    "email": "zy@itcast.cn",
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

### 2：查询文档

根据rest风格，新增是post，查询应该是get，不过查询一般都需要条件，这里我们把文档id带上。

**语法：**

```json
GET /{索引库名称}/_doc/{id}
```

**通过kibana查看数据：**

```js
GET /heima/_doc/1
```

### 3：删除文档

删除使用DELETE请求，同样，需要根据id进行删除：

**语法：**

```js
DELETE /{索引库名}/_doc/id值
```

**示例：**

```json
# 根据id删除数据
DELETE /heima/_doc/1
```



### 4：修改文档

修改有两种方式：

- **全量修改**：直接覆盖原来的文档
- **增量修改**：修改文档中的部分字段

#### 4.1 全量修改

全量修改是覆盖原来的文档，其本质是：

- 根据指定的id删除文档
- 新增一个相同id的文档

**注意**：如果根据id删除时，id不存在，第二步的新增也会执行，也就从修改变成了新增操作了。



**语法：**

```json
PUT /{索引库名}/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    // ... 略
}

```



**示例：**

```json
PUT /heima/_doc/1
{
    "info": "黑马程序员高级Java讲师",
    "email": "zy@itcast.cn",
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

#### 4.2 增量修改

增量修改是只修改指定id匹配的文档中的部分字段。

**语法：**

```json
POST /{索引库名}/_update/文档id
{
    "doc": {
         "字段名": "新的值",
    }
}
```



**示例：**

```json
POST /heima/_update/1
{
  "doc": {
    "email": "ZhaoYun@itcast.cn"
  }
}
```
### 5：总结

文档操作有哪些？

- **创建文档**：`POST /{索引库名}/_doc/文档id`   { json文档 }
- **查询文档**：`GET /{索引库名}/_doc/文档id`
- **删除文档**：`DELETE /{索引库名}/_doc/文档id`
- **修改文档**：
  - **全量修改**：`PUT /{索引库名}/_doc/文档id` { json文档 }
  - **增量修改**：`POST /{索引库名}/_update/文档id` { "doc": {字段}}
