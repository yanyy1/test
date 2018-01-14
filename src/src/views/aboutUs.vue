<template>
    <section id="aboutUs">
        <img src="static/img/eLogo.png" />
        <div class="aboutContent">银来融资租赁（上海）有限公司是由中国国家商务部批准从事提供融资租赁、经营性租赁、售后回租、租赁担保、商业保理等产品服务的综合性金融服务机构，公司注册地址位于上海自贸区，注册资本5000万美金，是一家专注于汽车金融领域全产业链的企业。股东成员包括香港博音视讯有限公司、上海庞贾信息科技有限公司。并与多家银行、金融公司、互联网金融平台保持着良好的战略合作关系。
本公司是一家专注于汽车金融领域全产业链的企业，自公司成立一来，业务不断壮大，通过完善已建立起一套科学、合理的管理机制和分工体系，精心打造销售及售后服务质量。通过完善的服务和专业的销售团队，我们以可靠的客户服务质量，忠诚可信的服务特色，全心全意提升客户的满意度，为顾客努力打造公司服务品牌。
通过汽车融资租赁及其他汽车销售增值业务，以车贷交易为目标，重点把汽车贷款领域的金融服务打造成为公司最核心的业务板块。凭借着公司雄厚的资金实力、畅通的人脉渠道、专业的运营管理团队以及行业内资深的合作伙伴，公司能够为客户提供更专业、更全面、更完善、更富个性化和创造性的汽车金融解决方案和其它汽车销售增值服务，帮助客户实现汽车购置、汽车融资、优选车型等全方位的整体方案。
 </div>
        <span class="version">V1.0</span>
    </section>
</template>
<script type="text/javascript">
export default{
     beforeCreate: function(){
        this.setDocumentTitle("关于我们");
    },
}
</script>
<style>
    #aboutUs{
        padding-bottom: 1.4rem;
    }
    #aboutUs>img{
        width: 1.76rem;
        height: auto;
        display: block;
        margin: 1.0667rem auto;
    }
    #aboutUs>.aboutContent{
        margin: 0 0.5rem;
        color: #333333;
        font-size: 0.4rem;
    }
    #aboutUs>.version{
        width: 100%;
        display: inline-block;
        text-align: center;
        color: #333333;
        font-size: 0.4534rem;
        position: fixed;
        bottom: 0;
        padding: 0.1334rem 0;
        background: white;
    }
</style>