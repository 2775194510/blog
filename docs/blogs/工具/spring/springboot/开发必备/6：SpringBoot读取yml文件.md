---
title: 6：SpringBoot读取yml文件
date: 2023-8-31
sidebar: auto
categories:
  - spring
tags:
  - springboot

author: 胡昊泽
---

有时候，我们需要将一些配置信息写入yml文件中，然后直接进行读取。

<p style="color:red">接下来将进行各个类型演示</p>

## 1：读取配置信息
### 1）Java类
```java
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
// @Component
public class Car {
    private String brand;
    private Integer price;
}
```

```java
@PropertySource(value = "classpath:/readYmlData.yml", factory= YamlPropertiesSourceFactory.class)
@ConfigurationProperties(prefix = "person")
@Component
@ToString
@Data
public class Person {
    private String userName;
    private Boolean boss;
    private Date birthday;
    private Integer age;
    private Car car;
    private String[] interests;
    private List<String> animal;
    private Map<String,Object> score;
    private Set<Double> salarys;
    private Map<String,List<Car>> allCars;
}
```

```java
@PropertySource(value = "classpath:/readYmlData.yml", factory= YamlPropertiesSourceFactory.class)
@ConfigurationProperties(prefix = "creditcard.trantype")
@Component
@ToString
@Data
public class CreditCardTranType {

	private Map<String, String> attrMap;
}
```

### 2）yml文件编写
```yml
person:
  userName: xiaoze
  boss: true
  birthday: 2021/12/9
  age: 21
  car:
    brand: 劳斯莱斯
    price: 99999
  interests:
    - 篮球
    - 足球
    - 乒乓球
  animal: [阿毛，阿狗]
  score: {English: 99,Chinese: 88}
  salarys:
    - 99.99
    - 88.88
  allCars:
    guide:
      - {brand: 比亚迪,price: 9900000}
      - brand: 奥迪
        price: 999999
      - brand: 奔驰
        price: 998888
    pianyi:
      - brand: hhhh
        price: 00000
      - brand: jjjjj
        price: 66666
creditcard:
  trantype:
    attrMap:
      '111': '111'
      '222': '222'
      '333': '333'
```
### 3）测试
```java
@RestController
public class HelloYaml {
 
    @Autowired
    Person person;

    @Autowired
    CreditCardTranType creditCardTranType;
    
    @RequestMapping("/HelloYaml")
    public R person(){
        return R.ok().data("person",person).data("creditCardTranType",creditCardTranType);
    }
}
```
### 4）结果
```json
{
    "success": true,
    "code": 20000,
    "message": "成功",
    "data": {
        "person": {
            "userName": "xiaoze",
            "boss": true,
            "birthday": 1638979200000,
            "age": 21,
            "car": {
                "brand": "劳斯莱斯",
                "price": 99999
            },
            "interests": [
                "篮球",
                "足球",
                "乒乓球"
            ],
            "animal": [
                "阿毛，阿狗"
            ],
            "score": {
                "English": 99,
                "Chinese": 88
            },
            "salarys": [
                99.99,
                88.88
            ],
            "allCars": {
                "guide": [
                    {
                        "brand": "比亚迪",
                        "price": 9900000
                    },
                    {
                        "brand": "奥迪",
                        "price": 999999
                    },
                    {
                        "brand": "奔驰",
                        "price": 998888
                    }
                ],
                "pianyi": [
                    {
                        "brand": "hhhh",
                        "price": 0
                    },
                    {
                        "brand": "jjjjj",
                        "price": 66666
                    }
                ]
            }
        },
        "creditCardTranType": {
            "attrMap": {
                "111": "111",
                "222": "222",
                "333": "333"
            }
        }
    }
}
```