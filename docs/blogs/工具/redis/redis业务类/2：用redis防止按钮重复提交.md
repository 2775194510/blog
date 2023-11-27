---
title: 2：用redis防止按钮重复提交
date: 2023-11-27
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---

利用 `setnx锁` 来实现，在 `多线程情况` 下也能 `防止重复提交业务` 等问题。

```java
        //String reqSeqNo = ReqHeadContext.getReqSeqNo();
		String reqSeqNo = "13456";
		
		// 创建一个固定大小为5的线程池
		ExecutorService executorService = Executors.newFixedThreadPool(5);
		
		// 循环提交100个任务到线程池
		for(int i=0;i<100;i++) {
			executorService.execute(new Runnable() {
				
				@Override
				public void run() {
				
					// 检查请求序列号是否不为空且在Redis中不存在对应的值
					
					// 尝试在Redis中设置请求序列号对应的值为 "true"
					if(StringUtils.isNotEmpty(reqSeqNo) && null == RedisUtils.get(reqSeqNo)) {
						boolean flag = RedisUtils.setnx(reqSeqNo, "true");
						// 如果设置成功，设置过期时间为20秒，否则打印重复提交的日志
						if(flag) {
							RedisUtils.expire(reqSeqNo, 20);
						} else {
							log.info("重复提交");
						}
					} else {
						log.info("重复提交");
						// 如果请求序列号为空或者在Redis中已经存在对应的值，打印重复提交的日志
						// 可根据具体业务需求选择是否抛出异常
						//throw new BusinessException("重复提交");
					}
				}
			});
		}
		
		executorService.shutdown();
    ```