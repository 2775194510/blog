---
title: 2：常用sql大全
date: 2023-8-15
sidebar: auto
keys: 
  - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---
## 1：Oracle建表sql
### 1）建表sql
```sql
create table table_name
(
  CHNL_FLOW_ID VARCHAR2(32) not null,
  CUS_NO       VARCHAR2(32) not null,
  USR_ID       VARCHAR2(32) not null,
  USR_NAME     VARCHAR2(100),
  ETP_TYP      VARCHAR2(2) not null,
  BODY_INFO    VARCHAR2(2000) not null,
  TRAN_STA     VARCHAR2(2) not null,
  CRET_TM      DATE not null,
  MODI_TM      DATE not null,
  RMRK_1       VARCHAR2(64),
  RMRK_2       VARCHAR2(256),
  RMRK_3       VARCHAR2(512)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64
    next 8
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table table_name
  is '企业操作员下挂账户信息';
-- Add comments to the columns 
comment on column table_name.CHNL_FLOW_ID
  is '交易流水号';
comment on column table_name.CUS_NO
  is '企业编号';
comment on column table_name.USR_ID
  is '操作员编号';
comment on column table_name.USR_NAME
  is '操作员名称';
comment on column table_name.ETP_TYP
  is '企业类型';
comment on column table_name.BODY_INFO
  is '操作记录信息';
comment on column table_name.TRAN_STA
  is '交易状态';
comment on column table_name.CRET_TM
  is '创造时间';
comment on column table_name.MODI_TM
  is '修改时间';
comment on column table_name.RMRK_1
  is '备注1';
comment on column table_name.RMRK_2
  is '备注2';
comment on column table_name.RMRK_3
  is '备注3';
-- Create/Recreate primary, unique and foreign key constraints 
alter table table_name
  add primary key (CHNL_FLOW_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate indexes 
create index IDX_table_name_1 on table_name (CUS_NO, USR_ID)
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

```

### 2）为字段创建索引
```sql
创建唯一索引：create unique index UK_ACC_RGUL_ETP_OPT_HANG_INF_1 on T_ACC_RGUL_ETP_OPT_HANG_INF (CUS_NO, USR_ID, ACCT_NO);
创建普通索引：create index IDX_ACC_YQDZ_ADJ_LIST_1 on T_ACC_YQDZ_ADJ_LIST (STMT_ID);
			create index IDX_ACC_YQDZ_ADJ_LIST_2 on T_ACC_YQDZ_ADJ_LIST (ACCT_NO, TRAN_DAT, TRAN_FLOW_ID);
```
## 2：常用sql

### 1）报表统计数量sql
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
## 3：mybatis自定义sql
### 1）根据一个字段去批量修改另外一个字段
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

### 2）传递多个字段
```java
	List<EtpHangAcctInfDo> selectEtpOptHangAcc(@Param("cusNo") String cusNo,@Param("usrId") String usrId,@Param("acctNo") String acctNo,
			@Param("yqzlFlag") String yqzlFlag, @Param("zbtFlag") String zbtFlag, 
			@Param("dzpjFlag") String dzpjFlag, @Param("ncpsgFlag") String ncpsgFlag,
			@Param("qryFlag")  String qryFlag,  @Param("trsFlag") String trsFlag, 
			@Param("ageFlag") String ageFlag,	@Param("rclFlag") String rclFlag);
```
```sql
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

### 3）传递对象
```java
	List<EtpGrpHangAcctInfDo> selectGrpEtpHangAcc(@Param("grpEtpHangInf") AccGrpEtpHangInfPo grpEtpHangInfPo);
```
```sql
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
