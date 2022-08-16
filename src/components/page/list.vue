<template>
	<div ref="search_list">
		<div v-title data-title="商品列表">商品列表</div>
		<list-header :sea="search" v-on:child-say="submit"></list-header>
		<!-- <div class="tabbaby">
	            <div v-for="(item, index) in tabName" :key="index" @click="activeClick(index)" :class="{active:index == num}"> {{item}}</div>
	        </div> -->
		<ul class="sort-wrap clearfix text-center">
			<li class="fl" :class="{active:sortField == 'sales_sum'}" @click="sort('xl')">销量
				<span class="icon">
						<em class="bottom" :class="{active:sort_id == 1}"></em><br>
						<em class="top" :class="{active:sort_id == 2}"></em>
					</span>
			</li>
			<li class="fl" :class="{active:sortField == 'price_member'}" @click="sort('jg')">价格
				<span class="icon">
						<em class="top" :class="{active:sort_id == 3}"></em><br>
						<em class="bottom" :class="{active:sort_id == 4}"></em>
					</span>
			</li>
			<li class="fl" @click="sort('rq')" :class="{active:sortField == 5}">人气</li>
			<li class="fl" @click="sort('new')" :class="{active:sortField == 'id'}">新品</li>
			<li class="fl" @click="sort('dp')" :class="{active:sortField == 6}">店铺</li>
			<div @click="drawer = true">
				<img src="../../assets/serchicorn.png" >
				 <span>筛选</span>
			</div>
			
			<el-drawer
				:visible.sync="drawer"
				:with-header="false">
				<div class="lis">
					<div class="inner-list">
						<div class="name">品牌</div>
						<div class="name-list">
							<div v-for="(item,index) in brandlist.brand" :key="index"  class="brand-name"
							@click="selectBrand(item.id, index)" :class="selected.brandIndex=== index? 'activeon' : ''">
									{{item.brand_name}} 
							</div>
						</div>

						<div class="fange" style="clear:both;"></div>

						<div class="name">价格</div>
						<div class="name-list">
							<input type="text" v-model="minprice" placeholder="最低价">
							<input type="text" v-model="maxprice" placeholder="最高价">
						</div>

						<div class="fange" style="clear:both;"></div>
						<!-- 状态 ：现货 ，预售 -->
						<div class="name">状态</div>
						<div class="name-list">
							<div v-for="(item,index) in preSaleCheck" :key="index" class="brand-name"  @click="getpersale(item,index)"
							:class="preSaleCheckActive === index? 'activeon' : ''">
								{{item}}
							</div>
						</div>
						<div class="fange" style="clear:both;"></div>

						<div class="name" v-if="classify !=null">分类</div>
						<div class="name-list">
							<div v-for="(item,index) in classify" :key="index" class="brand-name"  @click="getClassName(item.id,index)"
							:class="selected.classIndex=== index? 'activeon' : ''">
								{{item.class_name}}
							</div>
						</div>
						
						<div  style="clear:both;"></div>

						<div class="name-list" v-for="(item,index) in attributes " :key="index">
							<div class="valname" >{{item.attr_name}}</div>
								<div class="brand-name"  v-for="(val,index1) in item.attr_values" :key="index1" @click="getvalue(val,index1)"
								:class="selected.valueIndex=== val? 'activeon' : ''"> 
									{{val}}
								</div>
						</div>
						
					</div>

					<div class="footerbtn">
						<div @click="drawer=false" class="cancel" style="background:#fff">取消</div>
						<div @click="sort('dawerSearch'),drawer=false" class="confirm" style="background: #e4393c;color: #fff;">确认</div>
					</div>
				</div>
			</el-drawer>
		</ul>
		<ul class="list-wrap" v-if="sortField != 6">
			<li class="clearfix" v-for="(item,index) in search_data" :key="index">
				<div class="shop-product" @click="tolink(item.id)">
					<img :src="URL + item.pic_url" class="fl">
					<img v-show="item.goods_type_pic_url" :src="URL + item.goods_type_pic_url" class="cati">
					<div class="list-text fl">
						<p class="text">{{item.title}}</p>
						<p class="new-price">￥
							<span>{{item.goods_price || item.price_market|| item.price_member}}</span>
							<!-- <p class="status"><span v-show="item.comment_member != 0">已有{{item.comment_member}}条评论</span><span v-show="item.sales_sum != 0">{{item.sales_sum}}笔交易成功</span></p> -->
							<p class="status"><span>已有{{item.comment_member}}条评论</span><span>{{item.sales_sum}}笔交易成功</span></p>
					</div>
				</div>
				<div class="shoplist-show" @click="goToShop(item.store_id)">
					<div class="show-name">{{item.shop_name}}</div>
					<img src="../../assets/btn-right.png" class="btn-shop" />
				</div>
			</li>
		</ul>
		<shop-list v-if="sortField == 6 && search_type != 'goods'" :shoplist="search_data"></shop-list>
		<div v-show="search_data.length ==0 && sortField != 6" class="comm-null">
			<div class="con-wrap text-center">
				<img src="../../assets/null_com.png">
				<p>暂无商品</p>
			</div>
		</div>
		<div v-show="search_type != 'store' && sortField == 6" class="comm-null">
			<div class="con-wrap text-center">
				<img src="../../assets/null_com.png">
				<p>没有搜索到店铺哦，请搜索商品看看~</p>
			</div>
		</div>
		<Shopsn></Shopsn>
		<to-top></to-top>
		<div class="load" v-show="load" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
	
		<div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
	</div>
</template>

<script>
	import listHeader from '@/components/page/children/header.vue';
	import shopList from '@/components/shopCon/child/shoplist.vue'; //店铺列表样式
	import qs from 'qs';
	import {
		Toast
	} from 'mint-ui';
	import toTop from '@/components/page/toTop.vue';
	import Shopsn from '@/components/page/Shopsn.vue';
	export default {
		name: 'list',
		data() {
			return {
				tabName: ["宝贝", "店铺"],
				logoImg: require('@/assets/btn-return.png'),
				status: [true, false, false],
				search: true,
				sort_id: 1,
				sort_status: null,
				load: false,
				scrollWatch: true,
				load_wrap: true,
				search_data: [],
				msg: '',
				api_url: '',
				num: 0,
				sortField: 'sales_sum',
				search_type: 'goods',
				currentPage: 1,
				isBottom: false,
				isEnd: false,
				type:null,//判断是否为二级分类
				drawer: false,
				brandlist:{
					brand:[],
				},
				classify:[],
				preSaleCheck:['现货','预售'],
				preSaleCheckActive:'',
				attributes:[],
				selected:{
					brandIndex: null,
					classIndex: null,
					valueIndex: null,
				},
				minprice:'',
				maxprice:'',
			
			}
		},
		created() {
		this.selectedItem();
			this.type = this.$route.query.type;
			this.$store.state.search_value = '';
			if (this.$route.params.status == 'search') {
				this.api_url = this.$httpConfig.keyWordSearch;
			} else {
				this.api_url = this.$httpConfig.getAllGoods;
			}
			this.sort();
		},
		mounted() {
			var that = this;
			$(window).scroll(function() {
				if (!that.$refs.search_list) return;
				var bot = document.body.clientHeight;
				if (that.isBottom == false && bot + $(window).scrollTop() >= $(".list-wrap")[0].clientHeight) {
					that.isBottom = true;
					if (that.isEnd) {
						that.currentPage++;
						that.sort();
					}
				}
			});
		},
		methods: {
			selectedItem(){
			this.axios.get(this.$httpConfig.getSearchList,{
				params:{
					keyword: this.$route.params.id,
					class_id :this.nameattr,
					class_three:this.$route.params.status,	
					token: sessionStorage.getItem("data_token")
				}
			}).then((res) =>{
				this.brandlist.brand= res.data.data.data.brand;
				this.classify = res.data.data.data.classification;
				this.attributes = res.data.data.data.attr;
			}).catch(err => {
                console.log(err);
			});
			},
			selectBrand(id,index){
				this.brandid = id;	
				this.selected.brandIndex = index;		
				// let arrIndex = this.brandIndex.indexOf(index);
				// if(arrIndex>-1){
				// this.brandIndex.splice(arrIndex,1);
				// }else{
				// this.brandIndex.push(index);
       			// }
			},
			
			getClassName(classnmae,index){
				this.nameattr = classnmae;
				this.selected.classIndex = index;
				// let arrtIndex = this.classIndex.indexOf(index);
				// if(arrtIndex>-1){
				// this.classIndex.splice(arrtIndex,1);
				// }else{
				// this.classIndex.push(index);
				// }
			this.selectedItem();
			},
			getpersale(item,index){
				this.preSaleCheckActive = index;
				console.log('gu'+this.preSaleCheckActive)
			},
			getvalue(val,value){
				this.attvalue = value;
				this.selected.valueIndex = val;
	

			},
			goToShop(id){
				this.$router.push({
					name:"shopHome",
					params:{
					id:id,
					index:0
					}
				})
			},
			submit(search_data) {
				this.sortField = 'sales_sum';
				this.isBottom = false;
				this.isEnd = true;
				this.sort_id = 1;
				this.currentPage = 1;
				this.search_data = search_data;
			},
			activeClick(index) {
				this.num = index
			},
			toback: function() {
				this.$router.go(-1);
			},
			addClass: function(index) {
				for (var i = 0; i < this.status.length; i++) {
					this.$set(this.status, i, false);
				}
				this.$set(this.status, index, true);
			},
			sort(index) {
				this.isEnd = true;
				switch (index) {
					case 'xl':
						this.currentPage = 1;
						this.search_data = [];
						this.sortField = 'sales_sum';
						if (this.sort_id != 1) {
							this.sort_id = 1;
							this.sort_status = "desc";
						} else {
							this.sort_id = 2;
							this.sort_status = 'asc';
						}
						this.load = true;
						break;
					case 'jg':
						this.currentPage = 1;
						this.search_data = [];
						this.sortField = 'price_member';
						if (this.sort_id != 3) {
							this.sort_id = 3;
							this.sort_status = "asc";
						} else {
							this.sort_id = 4;
							this.sort_status = 'desc';
						}
						this.load = true;
						break;
					case 'rq':
						this.currentPage = 1;
						this.search_data = [];
						// if(this.sortField == 5) return;
						this.sortField = 5;
						this.sort_status = '';
						this.load = true;
						break;
					case 'new':
						this.currentPage = 1;
						this.search_data = [];
						// if(this.sortField == 5) return;
						this.sort_id = 7;
						this.sortField = 'id';
						this.sort_status = 'desc';
						this.load = true;
					break;
					case 'dp':
						this.currentPage = 1;
						this.search_data = [];
						if (this.sortField == 6) return;
						this.sortField = 6;
						break;
					case 'dawerSearch':
						this.currentPage = 1;
						this.search_data = [];
						break;
				}
				if (!this.$store.state.search_value == '' || this.$route.params.status == 'search') {
					this.api_url = this.$httpConfig.keyWordSearch;
					let value = '';
					if (this.$store.state.search_value) {
						value = this.$store.state.search_value;
					} else {
						value = this.$route.params.id;
					}
					this.axios.get(this.api_url, {
						params: {
							keyword: value,
							sort: this.sort_id,
							page: this.currentPage,
							min_price:this.minprice,
							max_price:this.maxprice,
							is_presell:this.preSaleCheckActive,	
							brand:this.brandid,
							class_id:this.nameattr,
							values:this.attvalue,	
							token: sessionStorage.getItem("data_token")					
						}
					}).then((res) => {
						if (res.data.status) {
							if (res.data.msg === '没有找到此商品') {
								this.msg = res.data.msg;
							}
							if (res.data.data.flag == 'store') {
								this.search_type = 'store';
								this.sort('dp');
							} else {
								this.search_type = 'goods';
							}
							var list = res.data.data.data;
							for (var i in list) {
								this.search_data.push(list[i]);
							}
	
							this.isEnd = true;
						} else {
							this.isEnd = false;
						}
						this.isBottom = false;
						this.load = false;
						this.load_wrap = false;
					}).catch((err) => {
						console.info('FailtrueErr', err);
					});
				} else if(this.type!=undefined){//二级分类查询
					this.axios.get(this.api_url, {
						params: {
							page: this.currentPage,
							class_two: this.$route.params.status,
							sort_type: this.sort_status,
							sort_field: this.sortField,
							min_price:this.minprice,
							max_price:this.maxprice,
							is_presell:this.preSaleCheckActive,	
							brand:this.brandid,
							class_id:this.nameattr,
							values:this.attvalue,	
							token: sessionStorage.getItem("data_token")						
						}
					}).then((res) => {
						if (res.data.status != 1) {
							this.isEnd = false;
							this.msg = res.data.message;
						} else {
							var list = res.data.data.records;
							for (var i in list) {
								this.search_data.push(list[i]);
							}
							this.isEnd = true;
						}
						this.isBottom = false;
						this.load = false;
						this.load_wrap = false;
					}).catch((err) => {
						console.log(err);
					});
				} else {
					//分类进来,三级分类查询
					this.axios.get(this.api_url, {
						params: {
							page: this.currentPage,
							class_three: this.$route.params.status,
							sort_type: this.sort_status,
							sort_field: this.sortField,
							min_price:this.minprice,
							max_price:this.maxprice,
							is_presell:this.preSaleCheckActive,	
							brand:this.brandid,
							class_id:this.nameattr,
							values:this.attvalue,
							token: sessionStorage.getItem("data_token")
						}
					}).then((res) => {
						if (res.data.status != 1) {
							this.isEnd = false;
							this.msg = res.data.message;
						} else {
							var list = res.data.data.records;
							for (var i in list) {
								this.search_data.push(list[i]);
							}
							this.isEnd = true;
						}
						this.isBottom = false;
						this.load = false;
						this.load_wrap = false;
					}).catch((err) => {
						console.log(err);
					});
				}
			},
			tolink(id) {
				this.$router.push({
					name: 'product',
					params: {
						id: id,
						status: 1
					}
				});
			},
		},
		components: {
			listHeader,
			Shopsn,
			toTop,
			shopList
		}
	}
</script>
<style >
.el-drawer{
	width: 95%!important; 
	margin-right: -1rem;
	overflow-y: scroll;
}	
.name{
	text-align: left;
    font-size: 0.35rem;
    padding: 0.15rem 0 0.15rem 0.2rem;
    border-bottom: 0.001rem solid #eaeaea;	
}
.name-list{
	display: flex;
    float: left;
    padding: 0.25rem 0.03rem 0.01rem 0.1rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    width: 109%;
}
input{
	margin: 0rem 0.11rem;
	display: inline;
    border: none;
    background: #e4e4e4;
    padding-bottom: 0.35rem;
    border-radius: 0.05rem;
    color: #666;
    padding: 0.2rem 0rem 0.2rem 0rem;
    text-align: center;	
	width: 2.75rem;
}
::placeholder{
	font-size: 0.28rem;	
}
.brand-name{
	width: 1.3rem;
    display: inline;
    background: #e4e4e4;
    padding: 0.15rem 0.15rem 0.15rem 0.24rem;
    border-radius: 0.05rem;
    font-size: 0.25rem;
    margin: 0rem 0.05rem 0.2rem 0.08rem;
}
.valname{
	width: 100%;
    text-align: left;
    font-size: 0.28rem;
    padding: 0rem 0.1rem;
}
.fange{
	height: 0.3rem;
    background: #efefef;
    margin: 1.3rem 0 0 0;
}
.footerbtn{
	display: inline-flex;
    position: fixed;
    left: 1.36rem;
    bottom: 0;
    width: 82%;
    text-align: center;
}
.cancel,.confirm{
	width:50%;
	padding: 0.2rem 0rem 0.2rem 0.2rem;
	font-size: 0.29rem;
    box-shadow: 0 -1px 2px 0 rgba(0,0,0,.07);
}
.activeon {
	background-color: #d02629;
	color: #fff !important;
}
</style>
<style lang="less" scoped>
	// tab切换
	.tabbaby {
		background: #fff;
		height: .85rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1/100rem solid #cbcbcb;
		div {
			font-size: 30/100rem;
			width: 275/100rem;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 50/100rem;
		}
		.active {
			border-bottom: 3/100rem solid #d02629;
			color: #d02629;
		}
	}
	
	.comm-null {
		padding-top: .5rem;
		p {
			font-size: .28rem;
			color: #666;
			padding-top: .2rem;
		}
	}
	
	.sort-wrap {
		height: .9rem;
		background: #fff;
		box-sizing: border-box;
		padding: .2rem 0;
		border-bottom: 1px solid #cbcbcb;
		line-height: .5rem;
		li {
			border-right: 1px solid #cbcbcb;
			box-sizing: border-box;
			width: 20%;
			font-size: .26rem;
			color: #666;
			position: relative;
			margin-left: -0.26rem;
			.icon {
				position: absolute;
				left: 1.2rem;
				top: 0;
				height: 100%;
				.top {
					position: absolute;
					left: 0;
					top: .17rem;
					width: .12rem;
					height: .06rem;
					background: url(../../assets/sort-top.png);
					background-size: 100% 100%;
				}
				.top.active {
					background: url(../../assets/sort-top-active.png);
					background-size: 100% 100%;
				}
				.bottom {
					position: absolute;
					left: 0;
					bottom: .17rem;
					width: .12rem;
					height: .06rem;
					background: url(../../assets/sort-bottom.png);
					background-size: 100% 100%;
				}
				.bottom.active {
					background: url(../../assets/sort-bottom-active.png);
					background-size: 100% 100%;
				}
			}
		}
		li:nth-child(5) {
			// border-right: 0;
		}
		li.active {
			color: #d02629;
		}
		div{
			color: #666;
			padding-right: 0.29rem;
			img{
				width: 0.33rem;
    			padding-top: 0.1rem;
			}
			span{
				font-size: .26rem;
			}
		}
		
	}
	
	.list-wrap {
		background: #fff;
		li {
			padding: .13rem;
			// height: 2.2rem;
			border-bottom: 1px solid #cbcbcb;
			.shop-product{
				display: flex;
				.cati{
					width: 0.5rem;
					height: 0.88rem;
					margin-left: -0.5rem;
					z-index: 0;
				}
				img {
					width: 2.2rem;
					height: 2.2rem;
				}
				.list-text {
					width: 4.3rem;
					padding-left: .25rem;
					.text {
						font-size: .32rem;
						color: #333;
						line-height: .45rem;
						padding-top: .1rem;
						height: .9rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					.new-price {
						font-size: .32rem;
						color: #f23030;
						padding-top: .3rem;
						span {
							font-size: .4rem;
							font-weight: bold;
						}
					}
					.status {
						color: #ddd;
						padding: .1rem 0 .05rem 0;
						display: flex;
						justify-content: space-between;
						span {
							font-size: .24rem;
						}
						span:nth-child(2) {
							padding-left: .3rem;
						}
					}
				}
			}
			.shoplist-show{
				display: flex;
				margin: 0 0 0 2.5rem;
				.show-name{
					font-size: .24rem;
					padding: 0 .1rem 0 0;
					color: #999999;
				}
				.btn-shop{
					width: .18rem;
					height: .2rem;
					margin-top: .075rem;
				}
			}
		}
	}
	
	.status {
		background: #fff;
		// text-align: center;
		padding-bottom: .2rem;
		font-size: .3rem;
		color: #333;
	}
</style>

<style lang="less">
	.load {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999999;
	}
	
	.load .mint-spinner-triple-bounce {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		top: 50%;
	}
</style>