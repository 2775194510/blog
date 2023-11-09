---
title: 2：mybatis常用sql大全
date: 2023-11-07
keys: 
  - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - 后端
tags:
  - mybatis
---

## 1：统计数量
```sql
 select usr_id,
    count(rpk_id) as rpkNum,
    count(case when rpk_sta = '03' then rpk_id else null end ) as wdrlRpkNum,
    count(case when rpk_sta = '01' then rpk_id else null end ) as noWdrlRpkNum,
    count(case when rpk_sta = '04' then rpk_id else null end ) as exdRpkNum,
    sum(case when rpk_sta = '03' then rpk_amt else 0 end ) as wdrlRpkAmt,
    sum(case when rpk_sta = '01' then rpk_amt else 0 end ) as noWdrlRpkAmt,
    sum(case when rpk_sta = '04' then rpk_amt else 0 end ) as exdRpkAmt,
    sum(case when rpk_sta = '03' and to_char(tran_tim,'yyyy') = to_char(sysdate,'yyyy') then rpk_amt else 0 end ) as yearWdrlRpkAmt,
    sum(case when rpk_sta = '03' and to_char(tran_tim,'yyyymm') = to_char(sysdate,'yyyymm') then rpk_amt else 0 end ) as monWdrlRpkAmt
    from t_acc_rpk_putout_list
    where usr_id = '5023032421091900000012'
    group by usr_id
```

## 2：根据一个字段去批量修改另外一个字段
mapper
```java
	public interface AccEtpOptOrderMapper extends BaseMapper<AccEtpOptOrderPo>{
	/**
	 * 根据流水号去批量修改 对应的交易状态
	 * @param chnlFLowIds
	 * @param tranSta
	 */
	void updAccEtpOptOrder(@Param("chnlFLowIds") List<String> chnlFLowIds, @Param("tranSta") String tranSta);

}
```
xml
```xml
<mapper namespace="com.xjrccb.bizplat.bcacce.infracl.mapper.AccEtpOptOrderMapper">

	<update id="updAccEtpOptOrder">
        update t_acc_etp_opt_order set tran_sta = #{tranSta} 
        <where>
            chnl_flow_id in (
	             <foreach collection ="chnlFLowIds" item="chnlFlowId" separator =",">
		            #{chnlFlowId}
		         </foreach >
            )
        </where>
     </update>
	
</mapper>
```
## 3：自定义sql（传递多个字段）
mapper
```java
	List<EtpHangAcctInfDo> selectEtpOptHangAcc(@Param("cusNo") String cusNo,@Param("usrId") String usrId,@Param("acctNo") String acctNo,
			@Param("yqzlFlag") String yqzlFlag, @Param("zbtFlag") String zbtFlag, 
			@Param("dzpjFlag") String dzpjFlag, @Param("ncpsgFlag") String ncpsgFlag,
			@Param("qryFlag")  String qryFlag,  @Param("trsFlag") String trsFlag, 
			@Param("ageFlag") String ageFlag,	@Param("rclFlag") String rclFlag);
```
xml
```xml
<select id="selectEtpOptHangAcc" resultType="com.xjrccb.bizplat.bcacce.infracl.dto.EtpHangAcctInfDo">
        select t1.hang_acct_id as hangAcctId,
        	   t1.cus_no     as cusNo,
        	   t1.usr_id     as usrId,
        	   t1.acct_no    as acctNo,
        	   t1.acct_alias as acctAlias,
               t1.dft_flag   as dftFlag,
               t1.cret_tm    as cretTm,
               t1.modi_tm    as modiTm,
               t2.acct_typ   as acctTyp,
               t2.acct_name  as acctName,
               t2.acct_opn_org      as acctOpnOrg,
               t2.acct_opn_name     as acctOpnName,
               t1.qry_flag     		as qryFlag,
               t1.trs_flag      	as trsFlag,
               t1.age_flag      	as ageFlag,
               t1.seq_no			as seqNo,
               t1.rcl_flag			as rclFlag
        from t_acc_etp_opt_hang_inf t1
        left join t_acc_etp_hang_inf t2 on t1.cus_no = t2.cus_no and t1.acct_no = t2.acct_no
        left join t_acc_etp_sign_inf t4 on t1.cus_no = t4.cus_no and t1.acct_no = t4.acct_no
 		<where>
 			t1.cus_no = #{cusNo} and t1.usr_id = #{usrId}
 			<if test="acctNo!=null and acctNo!=''">
 			   and t1.acct_no = #{acctNo}
 			</if> 
 			<if test="yqzlFlag!=null and yqzlFlag!=''">
 			   and t4.yqzl_flag = #{yqzlFlag}
 			</if>
 			<if test="zbtFlag!=null and zbtFlag!=''">
 			   and t4.zbt_flag = #{zbtFlag}
 			</if> 
 			<if test="dzpjFlag!=null and dzpjFlag!=''">
 			   and t4.dzpj_flag = #{dzpjFlag}
 			</if>
 			<if test="ncpsgFlag!=null and ncpsgFlag!=''">
 			   and t4.ncpsg_flag = #{ncpsgFlag}
 			</if>  			
 			<if test="qryFlag!=null and qryFlag!=''">
 			   and t1.qry_flag = #{qryFlag}
 			</if>  			
 			<if test="trsFlag!=null and trsFlag!=''">
 			   and t1.trs_flag = #{trsFlag}
 			</if>  			
 			<if test="ageFlag!=null and ageFlag!=''">
 			   and t1.age_flag = #{ageFlag}
 			</if>  			
 			<if test="rclFlag!=null and rclFlag!=''">
 			   and t1.rcl_flag = #{rclFlag}
 			</if>  			
 		</where>
 		order by t1.cret_tm desc
	</select>
```
## 4：自定义sql（传递对象）
```java
	List<EtpGrpHangAcctInfDo> selectGrpEtpHangAcc(@Param("grpEtpHangInf") AccGrpEtpHangInfPo grpEtpHangInfPo);
```
```xml
	<select id="selectGrpEtpHangAcc" resultType="com.xjrccb.bizplat.bcacce.infracl.dto.EtpGrpHangAcctInfDo">
		select t1.hang_acct_id as hangAcctId,
               t1.cus_no    as cusNo,
               t1.cus_mb_no as cusMbNo,
        	   t1.acct_no   as acctNo,
        	   t1.acct_name as acctName,
               t1.acct_typ  as acctTyp,
               t1.acct_opn_org as acctOpnOrg,
               t1.acct_opn_name as acctOpnName,
               t1.dft_flag  as dftFlag,
               t1.auth_flag as authFlag,
               t1.cret_tm   as cretTm,
               t1.modi_tm   as modiTm,
               t1.qry_flag  as qryFlag,
               t1.trs_flag  as trsFlag,
               t1.age_flag  as ageFlag,
               t1.ups_flag  as upsFlag,
               t1.dbt_flag  as dbtFlag,
               t1.acl_flag  as aclFlag
        from t_acc_grp_etp_hang_inf t1
 		<where>
 			t1.cus_no = #{grpEtpHangInf.cusNo}
 			<if test="grpEtpHangInf.sgFlag=='1'.toString() ">
 				and t1.cus_mb_no = #{grpEtpHangInf.cusNo}
 			</if>
 			<if test="grpEtpHangInf.sgFlag=='2'.toString() ">
 			   and t1.cus_no != t1.cus_mb_no
 			</if>
 			<if test="grpEtpHangInf.cusMbNo!=null and grpEtpHangInf.cusMbNo!=''">
 			   and t1.cus_mb_no = #{grpEtpHangInf.cusMbNo}
 			</if>
 			<if test="grpEtpHangInf.qryFlag!=null and grpEtpHangInf.qryFlag!=''">
 				and t1.qry_flag = #{grpEtpHangInf.qryFlag}
 			</if>
 			<if test="grpEtpHangInf.trsFlag!=null and grpEtpHangInf.trsFlag!=''">
 				and t1.trs_flag = #{grpEtpHangInf.trsFlag}
 			</if>
 			<if test="grpEtpHangInf.ageFlag!=null and grpEtpHangInf.ageFlag!=''">
 				and t1.age_flag = #{grpEtpHangInf.ageFlag}
 			</if>
 			<if test="grpEtpHangInf.upsFlag!=null and grpEtpHangInf.upsFlag!=''">
 				and t1.ups_flag = #{grpEtpHangInf.upsFlag}
 			</if>
 			<if test="grpEtpHangInf.dbtFlag!=null and grpEtpHangInf.dbtFlag!=''">
 				and t1.dbt_flag = #{grpEtpHangInf.dbtFlag}
 			</if>
 			<if test="grpEtpHangInf.aclFlag!=null and grpEtpHangInf.aclFlag!=''">
 				and t1.acl_flag = #{grpEtpHangInf.aclFlag}
 			</if>
 		</where>
 		order by t1.cret_tm desc
	</select>
```

## 5：自定义sql（字段模糊查询）
```xml
<select id="selectEtpOptHangAcc" resultType="com.xjrccb.bizplat.bcacce.infracl.dto.EtpHangAcctInfDo">
        select t1.hang_acct_id as hangAcctId,
        	   t1.cus_no     as cusNo,
        	   t1.usr_id     as usrId,
        	   t1.acct_no    as acctNo,
        	   t1.acct_alias as acctAlias,
               t1.dft_flag   as dftFlag,
               t1.cret_tm    as cretTm,
               t1.modi_tm    as modiTm,
               t2.acct_typ   as acctTyp,
               t2.acct_name  as acctName,
               t2.acct_opn_org      as acctOpnOrg,
               t2.acct_opn_name     as acctOpnName,
               t1.qry_flag     		as qryFlag,
               t1.trs_flag      	as trsFlag,
               t1.age_flag      	as ageFlag,
               t1.seq_no			as seqNo,
               t1.rcl_flag			as rclFlag
        from t_acc_etp_opt_hang_inf t1
        left join t_acc_etp_hang_inf t2 on t1.cus_no = t2.cus_no and t1.acct_no = t2.acct_no
        left join t_acc_etp_sign_inf t4 on t1.cus_no = t4.cus_no and t1.acct_no = t4.acct_no
 		<where>
 			t1.cus_no = #{cusNo} and t1.usr_id = #{usrId}
 			<if test="acctNo!=null and acctNo!=''">
 			   and t1.acct_no like  CONCAT(#{acctNo}, '%')
 			</if> 
 			<if test="yqzlFlag!=null and yqzlFlag!=''">
 			   and t4.yqzl_flag = #{yqzlFlag}
 			</if>
 			<if test="zbtFlag!=null and zbtFlag!=''">
 			   and t4.zbt_flag = #{zbtFlag}
 			</if> 
 			<if test="dzpjFlag!=null and dzpjFlag!=''">
 			   and t4.dzpj_flag = #{dzpjFlag}
 			</if>
 			<if test="ncpsgFlag!=null and ncpsgFlag!=''">
 			   and t4.ncpsg_flag = #{ncpsgFlag}
 			</if>  			
 			<if test="qryFlag!=null and qryFlag!=''">
 			   and t1.qry_flag = #{qryFlag}
 			</if>  			
 			<if test="trsFlag!=null and trsFlag!=''">
 			   and t1.trs_flag = #{trsFlag}
 			</if>  			
 			<if test="ageFlag!=null and ageFlag!=''">
 			   and t1.age_flag = #{ageFlag}
 			</if>  			
 			<if test="rclFlag!=null and rclFlag!=''">
 			   and t1.rcl_flag = #{rclFlag}
 			</if>  			
 		</where>
 		order by t1.cret_tm desc
	</select>
```

## 6：带条件查询( case when )
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.xjrccb.bizplat.bcaccp.infracl.mapper.AccCoreOdsMapper">

	<select id="selectListCoreTran" resultType="com.xjrccb.bizplat.bcaccp.api.dto.CustAcctTranInfo">
        select trim(subacct) as fndCd,
		       trim(acctno) as acctNo,
		       trim(cardno) as cardNo,
		       trim(ccy) as ccy,
		       trim(teller) as tranTlr,
		       cdflg as debCreFlag,
		       ctflg as cshTrsFlag,
		       tranamt as tranAmt,
		       case when cdflg = 'D' then tranamt else 0.00 end as debTranAmt,
		       case when cdflg = 'C' then tranamt else 0.00 end as creTranAmt,
		       bal as acctBal,
		       trim(ftfacctno) as oppAcctNo,
		       trim(oppaccname) as oppAcctNam,
		       trim(agentname) as oppAcctOpnBank,
		       trim(ptxnseq) as tranFlowId,
		       trandate as tranDat,
		       trim(oppclsno) as trantim,
		       trim(tranbrc) as tranOrg,
		       trim(channel) as tranChnl,
		       trim(briefcode) as absCd,
		       trim("desc") as abs,
		       trim(memo) as rmrk,
		       trim(clsno) as wriOffId
		  from ngcstrad.dpspersavelist t1
		  left join ngcstrad.pubmemocode t2 on t1.briefcode = memocode
		 where acctno like concat(#{acctNo},'%') and tranamt > 0
		 <if test="sttDat!=null and endDat!=null">
 			   and trandate between #{sttDat} and #{endDat}
 		 </if>
 		 <if test="minAmt!=null and maxAmt!=null">
 		      and tranamt between #{minAmt} and #{maxAmt}
 		 </if>
 		 <if test="tranFlowId!=null and tranFlowId!=''">
 		     and ptxnseq = #{tranFlowId}
 		 </if>
 		 <if test="debCreFlag!=null and debCreFlag!=''">
 		     and cdflg = #{debCreFlag}
 		 </if>
		 <if test="oppAcctNam!=null and oppAcctNam!=''">
		     and oppaccname like concat(#{oppAcctNam},'%')
		 </if>
		 order by trandate desc, ptxnseq desc 
	</select>
</mapper>
```

## 7：更新sql
```xml
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