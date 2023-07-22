<template><div><h2 id="_3-springboot统一解决跨域处理" tabindex="-1"><a class="header-anchor" href="#_3-springboot统一解决跨域处理" aria-hidden="true">#</a> 3：SpringBoot统一解决跨域处理</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>/**
 * 解决跨域问题
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(&quot;/**&quot;)
                .allowedOrigins(&quot;*&quot;)
                .allowedMethods(&quot;GET&quot;, &quot;HEAD&quot;, &quot;POST&quot;, &quot;PUT&quot;, &quot;DELETE&quot;, &quot;OPTIONS&quot;)
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders(&quot;*&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


