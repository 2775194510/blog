---
title: 1：mybatisPlus相关业务
date: 2023-11-09
keys: 
  - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - 后端
tags:
  - mybatisPlus
---

## 1：在使用逻辑删除的情况下，如何进行新增？

#### 1）问题
::: warning 会出现的问题
在这个表结构中，要添加的字段是一个 **主键** 。比如说，**我先添加一条从未添加过的数据**，此时它的 `deleted = 0`，然后我将这条数据进行 **删除** ，此时表中的数据还在，只不过它的`deleted = 1`，下次我再添加这条数据时，在查询条件中会自动拼接 `deleted = 0`，所以会查不到这个数据 ，但是表中已经存在主键这个数据，再次添加就会报错。
:::

#### 2）解决办法
> so ,既然不能用 `mybatisPlus api`解决，那就只能使用自定义sql来实现，自定义sql并不会自动拼接 `deleted = 0`

#### 3）流程图解决
![Alt text](./image.png)

#### 4）代码实现
```java
	@Override
	public FsBpfCommonOutput cardBinInfoAdd(FsBpfCardBinInfoAddInput input) {

		FsBpfCommonOutput output = new FsBpfCommonOutput();
		 // 1.输入参数校验
     	ValidatorUtils.validateEntity(input);
    	CardBinInfoPo binCardInfoPo = new CardBinInfoPo();

		// 2.判断卡bin信息是否已经存在,存在时抛出异常
     	CardBinInfoPo cardBinInfoPo = cardBinInfoMapper.getCardBinInf1(input.getCardBinNo());
     	if(cardBinInfoPo == null) {
            // 3.判断卡bin信息是否已经存在,存在时抛出异常
         	CardBinInfoPo cardBinInfoPo1 = cardBinInfoMapper.getCardBinInf2(input.getCardBinNo());
            if(cardBinInfoPo1 == null) {   // 新增操作
                // 3.对象转换输出
                binCardInfoPo = asBpfCardBinInfoAssembler.toAddCardBinInfoPo(input);
                
                // 4.新增卡bin信息
                binCardInfoPo.setDeleted(0);
                cardBinInfoRepository.add(binCardInfoPo);
            }else {
                binCardInfoPo = asBpfCardBinInfoAssembler.toAddCardBinInfoPo(input);
                cardBinInfoMapper.updCardBinInf(binCardInfoPo);
//                cardBinInfoRepository.updateById(binCardInfoPo);
            }
     	}else {
            binCardInfoPo = asBpfCardBinInfoAssembler.toAddCardBinInfoPo(input);

            cardBinInfoMapper.updCardBinInf(binCardInfoPo);
     	}
         
        return output;
	}
```

```xml
	<select id="getCardBinInf1" resultType="com.xjrccb.bizplat.bcbpfm.infracl.po.CardBinInfoPo">
		select 
			card_bin_no,bank_no,bank_code,bank_name,crd_typ,crd_len,superbank_flag, selfbank_flag 
        from t_bpf_card_bin_inf 
  		where #{cardBinNo} = card_bin_no and deleted = 0
	</select>
	
	<select id="getCardBinInf2" resultType="com.xjrccb.bizplat.bcbpfm.infracl.po.CardBinInfoPo">
		select 
			card_bin_no,bank_no,bank_code,bank_name,crd_typ,crd_len,superbank_flag, selfbank_flag 
        from t_bpf_card_bin_inf 
  		where #{cardBinNo} = card_bin_no and deleted = 1
	</select>
	

    <update id="updCardBinInf">
        update t_bpf_card_bin_inf 
             set 
             card_bin_no=#{cardBinInfoPo.cardBinNo},
             bank_no=#{cardBinInfoPo.bankNo},
             bank_code=#{cardBinInfoPo.bankCode},
             bank_name=#{cardBinInfoPo.bankName},
             
			<if test="cardBinInfoPo.crdTyp!=null and cardBinInfoPo.crdTyp!=''">
 			   crd_typ = #{cardBinInfoPo.crdTyp},
 			</if>
 			<if test="cardBinInfoPo.crdLen!=null and cardBinInfoPo.crdLen!=''">
 			   crd_len = #{cardBinInfoPo.crdLen},
 			</if>
			<if test="cardBinInfoPo.crdTyp==null or cardBinInfoPo.crdTyp==''">
 			   crd_typ = ' ',
 			</if>
 			<if test="cardBinInfoPo.crdLen==null or cardBinInfoPo.crdLen==''">
 			   crd_len = ' ',
 			</if>
             superbank_flag=#{cardBinInfoPo.superBankFlag},
             deleted = 0
         where card_bin_no = #{cardBinInfoPo.cardBinNo}
    </update>
```



