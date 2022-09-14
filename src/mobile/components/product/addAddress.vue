<template>
    <div class="addAddress">
        <div class="header">
            <i class="fa-solid fa-circle-chevron-left" id="backbtn" @click="back"></i>
            <div class="title">Add Address</div>
        </div>
        <div>
            <mt-field label="Name：" placeholder="Please enter the name" v-model="realname"></mt-field>
            <mt-field label="Phone Number:" placeholder="Please enter the phone number" v-model="phone"></mt-field>
            <mt-field label="Address:" placeholder="Please enter the address" v-model="address"></mt-field>
            <div class="mint-field">
                <span class="mint-cell-text">Location：</span>
                <div class="mint-cell-value" @click="callingArea">
                    <input placeholder="Please select the region" type="tel" class="mint-field-core" disabled v-model="addressAll">
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">  
            <div class="picker-toolbar">  
                <span class="mint-datetime-action mint-datetime-cancel" style="color:#ff8000;" @click="cancleaddress">Cancel</span>  
                <span class="mint-datetime-action mint-datetime-confirm" style="color:#ff8000;" @click="selectaddress">Confirm</span>  
            </div>  
            <div class="select">
            <ul class="address-area-tit">
                    <li 
                        v-model="prov"
                        :class="showProvince?'active':''" 
                        @click="selectedArea('province')">
                        {{ province }}</li>
                    <li  
                        v-model="Bcity"
                        v-if="choiceCity" 
                        :class="showCity?'active':''"
                        @click="selectedArea('city')">
                        {{ city }}</li>
                    <li  
                        v-model="district"
                        v-if="choiceArea" 
                        :class="showArea?'active':''">
                    {{ area }}</li>
                </ul>
                <ul class="address-city" v-if="showProvince">
                    <li 
                        v-for="(n, i) in addressPlace" 
                        @click="getProvince(n.id, n.name, i)" 
                        :class="i==provinceIndex?'selected-li':''"
                        :key="i">
                        {{ n.name }}</li>
                </ul>
                <ul class="address-city" v-if="showCity">
                    <li 
                        v-for="(n, i) in cityArr" 
                        @click="getCity(n.id, n.name, i)" 
                        :class="i==cityIndex?'selected-li':''"
                        :key="i">
                    {{ n.name }}</li>
                </ul>
                <ul class="address-city" v-if="showArea">
                    <li 
                        v-for="(n, i) in districtArr" 
                        @click="setCityEnd(n.id, n.name, i)" 
                        :class="i==areaIndex?'selected-li':''"
                        :key="i"
                    >{{ n.name }}</li>
                </ul>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { Field,Popup,Toast } from 'mint-ui';
    export default {
    name: "addAddress",
    data() {
        return {
            realname:'',
            phone:'',
            address:'',
            addressAll:'',
            popupVisible:false,
            prov:'',
            Bcity:'',
            district:'',
            showProvince: true,
            showCity: false, 
            showArea: false,
            province: 'choose',
            city: 'choose',
            area: 'choose',
            choiceProvince: false, // 省按钮的显示隐藏
            choiceCity: false, // 市按钮的显示隐藏
            choiceArea: false,
            provinceIndex: -1,
            cityIndex: -1,
            areaIndex: -1, 
            addressPlace: [
                {   
                    "id":1,
                    "name":"Yangon",
                    "parentid":0
                },

                { 
                    "id":2,
                    "name":"Mandalay",
                    "parentid":2
                },

                { 
                    "id":3,
                    "name":"Ayeyarwady",
                    "parentid":3
                },
            ],
            cityArr: [
                {   
                    "id":4,
                    "name":"Hlaing",
                    "parentid":1
                },
                {   
                    "id":10,
                    "name":"SanChaung",
                    "parentid":1
                },

                { 
                    "id":5,
                    "name":"Madaya",
                    "parentid":2
                },

                { 
                    "id":6,
                    "name":"Pathein",
                    "parentid":3
                },
            ],
            districtArr: [
                {   
                    "id":1,
                    "name":"Butar",
                    "parentid":4
                },

                { 
                    "id":2,
                    "name":"Madayar",
                    "parentid":5
                },

                { 
                    "id":3,
                    "name":"Wakhema",
                    "parentid":6
                },
            ],
        };
    },
    methods:{
        back() {
            this.$router.go(-1);
        },
        callingArea(){
            this.popupVisible = true;
        },
        cancleaddress(){
            this.popupVisible = false;
        },
        selectaddress() {
            this.popupVisible = false;
            if(this.province==""||this.province=="choose") {
                Toast('please select the region');
            } else if(this.city==""||this.city=="choose"){
                Toast('please select the city');
            }else if(this.area==""||this.area=="choose" ){
                Toast('please select the Township');
            }else{
                this.addressAll = this.province + '-' + this.city + '-' + this.area;
                this.choiceCity=false;
			    this.choiceArea=false; 
                this.showProvince=true;
                this.showCity = false; 
                this.showArea = false;
                this.province="choose"
            }
		},
        selectedArea(type) {
            if (type == "province") {
                this.cityIndex = -1;
                this.areaIndex = -1;               
                this.choiceCity = false;
                this.choiceArea = false;         
                this.showProvince = true;
                this.showCity = false;
                this.showArea = false;
                
            } else if (type == "city") {
                this.cityIndex = -1;
                this.areaIndex = -1;
                this.choiceArea = false;  
                this.showProvince = false;
                this.showCity = true;
                this.showArea = false;
            } 
        },
        getProvince (id, name, index) {
            this.Bcity = 'choose';
            this.area = 'choose';
            this.city = 'choose';
            this.choiceCity = true;
            this.province = name;
            this.provinceId = id;
            this.showProvince = false;
            this.showCity = true;
            this.showArea = false;
            this.cityArr = this.proAjax(this.provinceId, 1);
        },
        getCity (id, name, index) {
            this.area = 'choose',
            this.choiceArea = true;
            this.city = name;
            this.cityId = id;
            this.showProvince = false;
            this.showCity = false;
            this.showArea = true;
            this.districtArr = this.proAjax(this.cityId, 2);
        },
        setCityEnd(id, name, index) {
            this.area = name;
            this.areaId = id;
        },
        proAjax(index, selId) {
            this.axios({
                    method: 'post',
                    url: this.$httpConfig.cityList,
                    params: {
                        parent_id: index,
                        id: '',
                    }
                })
                .then((res) => {
                    let data = res.data.data;
                    if(selId == 0) {
                        this.addressPlace = data;
                    } else if(selId == 1) {
                        this.cityArr = data;
                    } else if(selId == 2) {
                        this.districtArr = data;
                    }
                }).catch((err) => {
                    console.log(err);
                });
		},
    },
    mounted(){
        this.proAjax(0, 0)
    },
    };
</script>
<style lang="less" scoped>
.addAddress{
    .header{
        display: flex;
        padding: 0.3rem 0.2rem;
        background: #fff;
        border-bottom: .05rem solid #f1f1f1;
        #backbtn{
            font-size: .4rem;
            color: #777;
        }
        .title{
            font-size: .3rem;
            margin-left: 2.4rem;
        }
    }
    .mint-popup-bottom{
        width: 100%;
        padding:.2rem;
        box-sizing: border-box;
        .select{
            padding:.2rem 0;
            select{
                padding-left:10/100rem;
                border: 1/100rem solid #d9d9d9;
                width: 24%;
                height: .5rem;
                background:#fff;
                outline: none;
                option{
                    color:#333;
                    text-align: center;
                }
            }
        }
    }
    .mint-cell-wrapper{
        padding-left: 0;
    }
    .mint-field{
        height: 1rem;
        line-height:1rem;
        background:#fff;
        border-bottom: .05rem solid #f1f1f1;
        .mint-cell-text{
            font-size:.26rem;
            padding:0 .2rem;
        }
        .mint-cell-value{
            font-size:.26rem;
            input{
                background:#fff;
            }
        }
    }
    .address-area-tit {
        padding: 0;
        box-shadow: none;
        border-bottom: 0;
        height:41px;
    }
    .address-area-tit li {
        cursor: pointer;
        position: relative;
        left: 0;
        top: 1px;
        padding: 0 .2rem;
        height:40px;
        width: 24%;
            overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 12px;
        display: inline-block;
        border-bottom: 1px solid #ccc;
    }
    .address-area-tit li.active {
        border-bottom: 1px solid #ff8000;
        color: #ff8000;
    }
    .address-city {
        margin-top: 10px;
        height:4.5rem;
        overflow: hidden;
        overflow-y: scroll;
        width: calc(100% + 30px);

    }
    .address-city li{
        padding: 0 35px;
        line-height: 30px;
        font-size: 12px;
        cursor: pointer;
    }
    .address-city li.selected-li {
        color: #ff8000;
    }
}
</style>