<template>
    <f7-page style="z-index: 1000">
        <f7-navbar no-shadow  back-link="Back" style="background: #FF6900;">

            <f7-nav-title>选择国家/地区</f7-nav-title>
            <f7-nav-right>
                <f7-link icon="icon-bars" panel-open="right" style="width: 80px;"></f7-link>
            </f7-nav-right>
        </f7-navbar>


            <f7-list >
                <transition name="fade">
                <div class="row text-align-center" v-show="lazyLoad">
                    <div class="col-100">
                        <div class="preloader"></div>
                    </div>
                </div>
                </transition>
            <f7-list-group v-for="(countryA,index) in countryAData1" :key="countryA.key" class="lazy">
                <f7-list-item title="A" group-title v-show="index==0"></f7-list-item>
                <!--<f7-link @click="selectCountry(countryA)">-->
                    <div style="width: 100%;" @click="selectCountry(countryA)">
                    <f7-list-item title="">
                        {{countryA.country}}
                    </f7-list-item>
                        </div>
                <!--</f7-link>-->
            </f7-list-group>

            <f7-list-group v-for="(countryB,index) in countryBData1" :key="countryB.key" class="lazy" >
                <f7-list-item title="B" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryB)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryB.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryC,index) in countryCData1" :key="countryC.key" class="lazy" >
                <f7-list-item title="C" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryC)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryC.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryD,index) in countryDData1" :key="countryD.key" class="lazy">
                <f7-list-item title="D" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryD)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryD.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryE,index) in countryEData1" :key="countryE.key" class="lazy">
                <f7-list-item title="E" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryE)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryE.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryF,index) in countryFData1" :key="countryF.key" class="lazy">
                <f7-list-item title="F" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryF)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryF.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryG,index) in countryGData1" :key="countryG.key" class="lazy">
                <f7-list-item title="G" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryG)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryG.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryH,index) in countryHData1" :key="countryH.key" class="lazy">
                <f7-list-item title="H" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryH)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryH.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryI,index) in countryIData1" :key="countryI.key" class="lazy">
                <f7-list-item title="I" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryI)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryI.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryJ,index) in countryJData1" :key="countryJ.key" class="lazy">
                <f7-list-item title="J" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryJ)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryJ.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryK,index) in countryKData1" :key="countryK.key" class="lazy">
                <f7-list-item title="K" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryK)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryK.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryL,index) in countryLData1" :key="countryL.key" class="lazy">
                <f7-list-item title="L" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryL)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryL.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryM,index) in countryMData1" :key="countryM.key" class="lazy">
                <f7-list-item title="M" group-title v-show="index==0"></f7-list-item>
                <div  @click="selectCountry(countryM)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryM.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryN,index) in countryNData1" :key="countryN.key" class="lazy">
                <f7-list-item title="N" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryN)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryN.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryO,index) in countryOData1" :key="countryO.key" class="lazy">
                <f7-list-item title="O" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryO)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryO.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryP,index) in countryPData1" :key="countryP.key" class="lazy">
                <f7-list-item title="P" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryP)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryP.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryQ,index) in countryQData1" :key="countryQ.key" class="lazy">
                <f7-list-item title="Q" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryQ)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryQ.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryR,index) in countryRData1" :key="countryR.key" class="lazy">
                <f7-list-item title="R" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryR)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryR.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryS,index) in countrySData1" :key="countryS.key" class="lazy" >
                <f7-list-item title="S" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryS)" style="width: 100%;">
                    <f7-list-item title="">
                        {{countryS.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryT,index) in countryTData1" :key="countryT.key" class="lazy">
                <f7-list-item title="T" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryT)">
                    <f7-list-item title="">
                        {{countryT.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryU,index) in countryUData1" :key="countryU.key" class="lazy">
                <f7-list-item title="U" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryU)">
                    <f7-list-item title="">
                        {{countryU.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryV,index) in countryVData1" :key="countryV.key" class="lazy">
                <f7-list-item title="V" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryV)">
                    <f7-list-item title="">
                        {{countryV.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryY,index) in countryYData1" :key="countryY.key" class="lazy">
                <f7-list-item title="Y" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryY)">
                    <f7-list-item title="">
                        {{countryY.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
            <f7-list-group v-for="(countryZ,index) in countryZData1" :key="countryZ.key" class="lazy">
                <f7-list-item title="Z" group-title v-show="index==0"></f7-list-item>
                <div @click="selectCountry(countryZ)">
                    <f7-list-item title="">
                        {{countryZ.country}}
                    </f7-list-item>
                </div>
            </f7-list-group>
        </f7-list>
    </f7-page>
</template>
<script>
    import { mapMutations } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    export default {
        components:{
        },
        data(){
            return{
                sendVal: false,
                loginName:null,
                
                uid:0,
                client:null,
                localStream:null,
                countryAData1:[],
                countryAData: [
                    {country: 'Angola', code: '+244',abbreviation:'AO'},
                    {country: 'Afghanistan', code: '+93',abbreviation:'AF'},
                    {country: 'Albania', code: '+355',abbreviation:'AL'},
                    {country: 'Algeria', code: '+213',abbreviation:'DZ'},
                    {country: 'American Samoa', code: '+684',abbreviation:'AS'},
                    {country: 'Andorra', code: '+376',abbreviation:'AD'},
                    {country: 'Anguilla', code: '+1264',abbreviation:'AI'},
                    {country: 'Antigua and Barbuda', code: '+1268',abbreviation:'AG'},
                    {country: 'Argentina', code: '+54',abbreviation:'AR'},
                    {country: 'Armenia', code: '+374',abbreviation:'AM'},
                    {country: 'Ascension', code: '+247',abbreviation:'RUB'},
                    {country: 'Australia', code: '+61',abbreviation:'AU'},
                    {country: 'Austria', code: '+43',abbreviation:'AT'},
                    {country: 'Azerbaijan', code: '+994'}
                ],
                countryBData1:null,
                countryBData: [
                    {country: 'Bahamas', code: '+1242',abbreviation:'BS'},
                    {country: 'Bahrain', code: '+973',abbreviation:'BH'},
                    {country: 'Bangladesh', code: '+880',abbreviation:'BD'},
                    {country: 'Barbados', code: '+1246',abbreviation:'BB'},
                    {country: 'Belarus', code: '+375',abbreviation:'BY'},
                    {country: 'Belgium', code: '+32',abbreviation:'BE'},
                    {country: 'Belize', code: '+501',abbreviation:'BZ'},
                    {country: 'Benin', code: '+229',abbreviation:'BJ'},
                    {country: 'Bermuda', code: '+1441',abbreviation:'BM'},
                    {country: 'Bolivia', code: '+591',abbreviation:'BO'},
                    {country: 'Botswana', code: '+267',abbreviation:'BW'},
                    {country: 'Brazil', code: '+55',abbreviation:'BR'},
                    {country: 'Brunei', code: '+673',abbreviation:'BN'},
                    {country: 'Bulgaria', code: '+359',abbreviation:'BG'},
                    {country: 'Burkina-faso', code: '+226',abbreviation:'BF'},
                    {country: 'Burma', code: '+95',abbreviation:'MM'},
                    {country: 'Burundi', code: '+257',abbreviation:'BI'}
                ],
                countryCData1:null,
                countryCData: [
                    {country: 'Cameroon', code: '+237',abbreviation:'CM'},
                    {country: 'Canada', code: '+1',abbreviation:'CAN'},
                    {country: 'Cayman Islands', code: '+1345',abbreviation:'KY'},
                    {country: 'Central African Republic', code: '+236',abbreviation:'CF'},
                    {country: 'Chad', code: '+235',abbreviation:'TD'},
                    {country: 'Chile', code: '+56',abbreviation:'CL'},
                    {country: 'China', code: '+86',abbreviation:'CN'},
                    {country: 'Colombia', code: '+57',abbreviation:'CO'},
                    {country: 'Congo', code: '+242',abbreviation:'CG'},
                    {country: 'Cook Islands', code: '+682',abbreviation:'CK'},
                    {country: 'Costa Rica', code: '+506',abbreviation:'CR'},
                    {country: 'Cuba', code: '+53',abbreviation:'CU'},
                    {country: 'Cyprus', code: '+357',abbreviation:'CY'},
                    {country: 'Czech Republic', code: '+420',abbreviation:'CZ'}
                ],
                countryDData1:null,
                countryDData: [
                    {country: 'Denmark', code: '+45',abbreviation:'DK'},
                    {country: 'Djibouti', code: '+253',abbreviation:'DJ'},
                    {country: 'Dominica Republic', code: '+1890',abbreviation:'DO'}
                ],
                countryEData1:null,
                countryEData: [
                    {country: 'Ecuador', code: '+593',abbreviation:'EC'},
                    {country: 'Egypt', code: '+20',abbreviation:'EG'},
                    {country: 'El Salvador', code: '+503',abbreviation:'SV'},
                    {country: 'Estonia', code: '+372',abbreviation:'EE'},
                    {country: 'Ethiopia', code: '+251',abbreviation:'ET'},
                ],
                countryFData1:null,
                countryFData: [
                    {country: 'Fiji', code: '+679',abbreviation:'FJ'},
                    {country: 'Finland', code: '+358',abbreviation:'FI'},
                    {country: 'France', code: '+33',abbreviation:'FR'},
                    {country: 'French Guiana', code: '+594',abbreviation:'GF'},
                    {country: 'French Polynesia', code: '+689',abbreviation:'PF'},
                ],
                countryGData1:null,
                countryGData: [
                    {country: 'Gabon', code: '+241',abbreviation:'GA'},
                    {country: 'Gambia', code: '+220',abbreviation:'GM'},
                    {country: 'Georgia', code: '+995',abbreviation:'GE'},
                    {country: 'Germany', code: '+49',abbreviation:'DE'},
                    {country: 'Ghana', code: '+233',abbreviation:'GH'},
                    {country: 'Gibraltar', code: '+350',abbreviation:'GI'},
                    {country: 'Greece', code: '+30',abbreviation:'GR'},
                    {country: 'Grenada', code: '+1809',abbreviation:'GD'},
                    {country: 'Guam', code: '+1671',abbreviation:'GU'},
                    {country: 'Guatemala', code: '+502',abbreviation:'GT'},
                    {country: 'Guinea', code: '+224',abbreviation:'GN'},
                    {country: 'Guyana', code: '+592',abbreviation:'GY'},
                ],
                countryHData1:null,
                countryHData: [
                    {country: 'Haiti', code: '+509',abbreviation:'HT'},
                    {country: 'Honduras', code: '+504',abbreviation:'HN'},
                    {country: 'Hongkong,China', code: '+852',abbreviation:'HK'},
                    {country: 'Hungary', code: '+36',abbreviation:'HU'},
                ],
                countryIData1:null,
                countryIData: [
                    {country: 'Iceland', code: '+354',abbreviation:'IS'},
                    {country: 'India', code: '+91',abbreviation:'IND'},
                    {country: 'Indonesia', code: '+62',abbreviation:'INA'},
                    {country: 'Iran', code: '+98',abbreviation:'IR'},
                    {country: 'Iraq', code: '+964',abbreviation:'IQ'},
                    {country: 'Ireland', code: '+353',abbreviation:'IE'},
                    {country: 'Israel', code: '+972',abbreviation:'IL'},
                    {country: 'Italy', code: '+39',abbreviation:'IT'},
                    {country: 'Ivory Coast', code: '+225',abbreviation:'CI'},
                ],
                countryJData1:null,
                countryJData: [
                    {country: 'Jamaica', code: '+1876',abbreviation:'JM'},
                    {country: 'Japan', code: '+81',abbreviation:'JP'},
                    {country: 'Jordan', code: '+962',abbreviation:'JO'},
                ],
                countryKData1:null,
                countryKData: [
                    {country: 'Kampuchea(Cambodia)', code: '+855',abbreviation:'KH'},
                    {country: 'Kazakstan', code: '+327',abbreviation:'KZ'},
                    {country: 'Kenya', code: '+254',abbreviation:'KE'},
                    {country: 'Korea', code: '+82',abbreviation:'KR'},
                    {country: 'Kuwait', code: '+965',abbreviation:'KW'},
                    {country: 'Kyrgyzstan', code: '+331',abbreviation:'KG'},
                ],
                countryLData1:null,
                countryLData: [
                    {country: 'Laos', code: '+856',abbreviation:'LA'},
                    {country: 'Latvia', code: '+371',abbreviation:'LV'},
                    {country: 'Lebanon', code: '+961',abbreviation:'LB'},
                    {country: 'Lesotho', code: '+266',abbreviation:'LS'},
                    {country: 'Liberia', code: '+231',abbreviation:'LR'},
                    {country: 'Libya', code: '+218',abbreviation:'LY'},
                    {country: 'Liechtenstein', code: '+423',abbreviation:'LI'},
                    {country: 'Lithuania', code: '+370',abbreviation:'LT'},
                    {country: 'Luxembourg', code: '+352',abbreviation:'LU'},
                ],
                countryMData1:null,
                countryMData: [
                    {country: 'Macao,China', code: '+853',abbreviation:'MO'},
                    {country: 'Madagascar', code: '+261',abbreviation:'MG'},
                    {country: 'Malawi', code: '+265',abbreviation:'MW'},
                    {country: 'Malaysia', code: '+60',abbreviation:'MY'},
                    {country: 'Maldives', code: '+960',abbreviation:'MV'},
                    {country: 'Mali', code: '+223',abbreviation:'ML'},
                    {country: 'Malta', code: '+356',abbreviation:'MT'},
                    {country: 'Martinique', code: '+596',abbreviation:'MQ'},
                    {country: 'mauritius', code: '+230',abbreviation:'MU'},

                    {country: 'Mexico', code: '+52',abbreviation:'MX'},
                    {country: 'Moldova,Republic of', code: '+373',abbreviation:'MD'},
                    {country: 'Monaco', code: '+377',abbreviation:'MC'},
                    {country: 'Mongolia', code: '+976',abbreviation:'MN'},
                    {country: 'Montserrat ls', code: '+1664',abbreviation:'MS'},
                    {country: 'Morocco', code: '+212',abbreviation:'MA'},
                    {country: 'Mozambique', code: '+258',abbreviation:'MZ'},
                ],
                countryNData1:null,
                countryNData: [
                    {country: 'Namibia', code: '+264',abbreviation:'NA'},
                    {country: 'Nauru', code: '+674',abbreviation:'NR'},
                    {country: 'Nepal', code: '+977',abbreviation:'NP'},
                    {country: 'Netherlands Antilles', code: '+599',abbreviation:'AN'},
                    {country: 'Netherlands', code: '+31',abbreviation:'NL'},
                    {country: 'New Zealand', code: '+64',abbreviation:'MZ'},
                    {country: 'Nicaragua', code: '+505',abbreviation:'NI'},
                    {country: 'Niger', code: '+227',abbreviation:'NE'},
                    {country: 'Nigeria', code: '+234',abbreviation:'NG'},
                    {country: 'North Korea', code: '+850',abbreviation:'KP'},
                    {country: 'Northern Mariana Islands', code: '+1670',abbreviation:'MP'},
                    {country: 'Norway', code: '+47',abbreviation:'NO'},
                ],
                countryOData1:null,
                countryOData: [
                    {country: 'Oman', code: '+968',abbreviation:'OM'}
                ],
                countryPData1:null,
                countryPData: [
                    {country: 'Pakistan', code: '+92',abbreviation:'PK'},
                    {country: 'Panama', code: '+507',abbreviation:'PA'},
                    {country: 'Papua New Cuinea', code: '+675',abbreviation:'IND'},
                    {country: 'Paraguay', code: '+595',abbreviation:'PY'},
                    {country: 'Peru', code: '+51',abbreviation:'PE'},
                    {country: 'Philippines', code: '+63',abbreviation:'PH'},
                    {country: 'Poland', code: '+48',abbreviation:'PL'},
                    {country: 'Portugal', code: '+351',abbreviation:'PT'},
                    {country: 'Puerto Rico', code: '+1787',abbreviation:'PR'},
                ],
                countryQData1:null,
                countryQData: [
                    {country: 'Qatar', code: '+974',abbreviation:'QA'}
                ],
                countryRData1:null,
                countryRData: [
                    {country: 'Reunion Island', code: '+262',abbreviation:'YT'},
                    {country: 'Romania', code: '+40',abbreviation:'RO'},
                    {country: 'Russia', code: '+7',abbreviation:'RU'},
                ],
                countrySData1:null,
                countrySData: [
                    {country: 'Saint Lueia', code: '+1758',abbreviation:'LC'},
                    {country: 'Saint Vincent', code: '+1784',abbreviation:'VC'},
                    {country: 'Samoa Western', code: '+685',abbreviation:'WS'},
                    {country: 'San Marino', code: '+378',abbreviation:'SW'},
                    {country: 'Sao Tome and Principe', code: '+239',abbreviation:'ST'},
                    {country: 'Saudi Arabia', code: '+966',abbreviation:'SA'},
                    {country: 'Senegal', code: '+221',abbreviation:'SN'},
                    {country: 'Seychelles', code: '+248',abbreviation:'SC'},
                    {country: 'Sierra Leone', code: '+232',abbreviation:'SL'},
                    {country: 'Singapore', code: '+65',abbreviation:'SG'},
                    {country: 'Slovakia', code: '+421',abbreviation:'SK'},
                    {country: 'Slovenia', code: '+386',abbreviation:'SI'},
                    {country: 'Solomon ls', code: '+677',abbreviation:'SB'},
                    {country: 'Somali', code: '+252',abbreviation:'SO'},
                    {country: 'South Africa', code: '+27',abbreviation:'ZA'},
                    {country: 'Spain', code: '+34',abbreviation:'ES'},
                    {country: 'Sri Lanka', code: '+94',abbreviation:'LK'},
                    {country: 'St.Lucia', code: '+1758',abbreviation:'LC'},
                    {country: 'St.Vincent', code: '+1784',abbreviation:'VC'},
                    {country: 'Sudan', code: '+294',abbreviation:'SD'},
                    {country: 'Suriname', code: '+597',abbreviation:'SR'},
                    {country: 'Swaziland', code: '+268',abbreviation:'SZ'},
                    {country: 'Sweden', code: '+46',abbreviation:'SE'},
                    {country: 'Switzerland', code: '+41',abbreviation:'CH'},
                    {country: 'Syria', code: '+963',abbreviation:'SY'},
                ],
                countryTData1:null,
                countryTData: [
                    {country: 'Taiwan,China', code: '+886',abbreviation:'TW'},
                    {country: 'Tajikstan', code: '+992',abbreviation:'TJ'},
                    {country: 'Tanzania', code: '+255',abbreviation:'TZ'},
                    {country: 'Thailand', code: '+66',abbreviation:'TH'},
                    {country: 'Togo', code: '+228',abbreviation:'TG'},
                    {country: 'Tonga', code: '+676',abbreviation:'TO'},
                    {country: 'Trinidad and Tobago', code: '+1809',abbreviation:'TT'},
                    {country: 'Tunisia', code: '216',abbreviation:'TN'},
                    {country: 'Turkey', code: '+90',abbreviation:'TR'},
                    {country: 'Turkmenistan', code: '+993',abbreviation:'TM'},
                ],
                countryUData1:null,
                countryUData: [
                    {country: 'Uganda', code: '+256',abbreviation:'UG'},
                    {country: 'Ukraine', code: '+380',abbreviation:'UA'},
                    {country: 'United Arab Emirates', code: '+971',abbreviation:'AE'},
                    {country: 'United Kiongdom', code: '+44',abbreviation:'GB'},
                    {country: 'United States of America', code: '+1',abbreviation:'UN'},
                    {country: 'Uruguay', code: '+598',abbreviation:'UY'},
                    {country: 'Uzbekistan', code: '+233',abbreviation:'UZ'},
                ],
                countryVData1:null,
                countryVData: [
                    {country: 'Venezuela', code: '+58',abbreviation:'VE'},
                    {country: 'Vietnam', code: '+84',abbreviation:'VN'},
                ],
                countryYData1:null,
                countryYData: [
                    {country: 'Yemen', code: '+967',abbreviation:'YE'},
                    {country: 'Yugoslavia', code: '+381',abbreviation:'YU'},
                ],
                countryZData1:null,
                countryZData: [
                    {country: 'Zimbabwe', code: '+263',abbreviation:'ZW'},
                    {country: 'Zaire', code: '+243',abbreviation:'ZR'},
                    {country: 'Zambia', code: '+260',abbreviation:'ZM'},
                ],

                lazyLoad:true,

            }
        },
        methods:{
            ...mapMutations(['setCountry']),
            openMask(index){
                this.sendVal = true;
            },
            clickCancel(){
                console.log('点击了取消');
            },
            clickDanger(){
                console.log('这里是danger回调')
            },
            clickConfirm(){
                console.log('点击了confirm');
            },
            selectCountry(country){
                this.setCountry(country)
                var code=country.code
                this.$EventBus.$emit("updateCode",
                    {
                        country:country,
                    });
                console.log(code);
                this.$f7router.back()
                // this.$f7router.navigate("/phoneLogin/")
            },

            goBack(){
                console.log('goBack');
                this.$f7router.back()
            },

        },
        mounted(){
            console.log('mounted');
            const self=this
            // self.$f7.preloader.show();

            setTimeout(function () {
                if (self && !self._isDestroyed) {
                    self.lazyLoad=false
                    self.countryAData1=self.countryAData
                    self.countryBData1=self.countryBData
                    self.countryCData1=self.countryCData
                    self.countryDData1=self.countryDData
                    self.countryEData1=self.countryEData
                    self.countryFData1=self.countryFData
                    self.countryGData1=self.countryGData
                    self.countryHData1=self.countryHData
                    self.countryIData1=self.countryIData
                    self.countryJData1=self.countryJData
                    self.countryKData1=self.countryKData
                    self.countryLData1=self.countryLData
                    self.countryMData1=self.countryMData
                    self.countryNData1=self.countryNData
                    self.countryOData1=self.countryOData
                    self.countryPData1=self.countryPData
                    self.countryQData1=self.countryQData
                    self.countryRData1=self.countryRData
                    self.countrySData1=self.countrySData
                    self.countryTData1=self.countryTData
                    self.countryUData1=self.countryUData
                    self.countryVData1=self.countryVData
                    self.countryYData1=self.countryYData
                    self.countryZData1=self.countryZData
                    // self.$f7.preloader.hide();
                }
            },100)
        },
    }
</script>
<style scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
