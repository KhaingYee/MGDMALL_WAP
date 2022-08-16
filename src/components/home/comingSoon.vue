<template>
    <div class="comingSoon">
        敬请期待....
    </div>
</template>

<script>
export default {
    name: "comingSoon",
    data() {
        return {
            headParams: {
                title: sessionStorage.getItem('titleKey'),
                description: sessionStorage.getItem('updateDescription'),
                keywords: sessionStorage.getItem('contentKey'),        
            }
        }
    },
    head: {
        meta: function(){
            return [
                { name: 'title', content: this.headParams.title, id: 'desc' },
                { name: 'description', content: this.headParams.description, id: 'desc1' },
                { name: 'keywords', content: this.headParams.keywords, id: 'desc2' },
            ]
        }
    },
    created(){
        let title = "敬请期待" + '-' + sessionStorage.getItem('titleKey');
        this.showScroll.scrollTitle(title);
    },
    mounted() {
        
    },
    methods: {
        
    }
};
</script>

<style lang="less" scoped>
    .comingSoon {
        height: 800px;
        background: #FFF;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        justify-content: center;
        color: gray;
    }
</style>
