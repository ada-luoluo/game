import {request} from "@/network/request";

//about us
export function  getAbout() {
    return request({
        url: '/about_uses'
    })
}

//games
export function  getGames(page) {
    return request({
        url: '/games',
        params:{
            page
        }
    })
}

// gamesMore
export function getGamesDetail(id){
    return request({
        url: '/games/'+ id,
    })
}


//news
export function  getNews(page) {
    return request({
        url: '/latest_news',
        params:{
            page
        }
    })
}

//contact
export function  getContact() {
    return request({
        url: '/contact_uses'
    })
}

//serve
export function  getServe() {
    return request({
        url: '/editor/1'
    })
}

//Privacy
export function  getPrivacy() {
    return request({
        url: '/editor/2'
    })
}

//Disclaimer
export function  getDisclaimer() {
    return request({
        url: '/editor/3'
    })
}

//Integral
export function  getKnow() {
    return request({
        url: '/points_notices'
    })
}

//cate
export function  getGiftCate() {
    return request({
        url: '/gift_coupon_categories'
    })
}

//CateList data
// 拿每个分类下的数据, 如有全部和下面的其他分类,只要category_id就可以, id为null时,显示的就是全部
//根据积分起始值,显示搜索结果的数据
export function  getCateList(category_id, page,points_start, points_end) {
    return request({
        url: '/gift_coupons',
        params:{
            category_id,
            page,
            points_start,
            points_end,
        }
    })
}


//exchangeMore
export function getExchangeMore(id){
    return request({
        url: '/gift_coupons/'+ id,
    })
}

//all exchange----home
export function  getALLExchange() {
    return request({
        url: '/gift_coupons'
    })
}

//contact form
export function  contactForm(params) {
    return request({
        url: '/contact_uses',
        method: 'post',
        data: params,
    })
}


//龙虎榜
export function getLeaderboard(id, page, month){
    return request({
        url: '/dragon_tiger_list/'+ id,
        params:{
            page,
            month,
        }
    })
}


//全部游戏

export function  getAllGames() {
    return request({
        url: '/all_games'
    })
}


//---------------------------------会员-----------------------------------------

//area code
export function  getAreaCode() {
    return request({
        url: '/area_codes'
    })
}

//generation
export function  getGeneration() {
    return request({
        url: '/age_ranges'
    })
}

//sendCode
export function  sendCode(params) {
    return request({
        url: '/auth/register_verification_code',
        method: 'post',
        data: params,
    })
}

//register
export function registerForm(params) {
    return request({
        url: '/auth/register',
        method: 'post',
        data: params,
    })
}

export function login(params) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: params,
    })
}

//personal info
export function getPersonalInfo() {
    return request({
        url: '/profile/me'
    })
}


// update personal info
export function  Update(params) {
    return request({
        url: '/profile/me/update',
        method: 'post',
        data: params,
    })
}

//上傳頭像
export function  UploadAvatar(params) {
    return request({
        url: '/upload/image',
        method: 'post',
        data: params,
    })
}

//修改手機號--驗證碼
export function TelCode(params) {
    return request({
        url: '/update_tel_verification_code',
        method: 'post',
        data: params,
    })
}

// update tel
export function UpdateTel(params) {
    return request({
        url: '/update_tel',
        method: 'post',
        data: params,
    })
}

//update password
export function UpdatePassword(params) {
    return request({
        url: '/update_password',
        method: 'post',
        data: params,
    })
}

//logout
export function Logout(params) {
    return request({
        url: '/logout',
        method: 'post',
        data: params,
    })
}


//忘記密碼---驗證碼
export function ForgetTelCode(params) {
    return request({
        url: '/auth/forget_password_verification_code',
        method: 'post',
        data: params,
    })
}

//忘記密碼
export function ForgetPassword(params) {
    return request({
        url: '/auth/forget_password',
        method: 'post',
        data: params,
    })
}


//积分记录
export function getPointsRecords(page,status) {
    return request({
        url: '/user/points_records',
        params:{
            page,
            status,
        }
    })
}

//代币记录
export function getGoldRecords(page,status) {
    return request({
        url: '/user/token_records',
        params:{
            page,
            status,
        }
    })
}

//礼品券领取细节
export function getPickUpDetail() {
    return request({
        url: '/receive_details'
    })
}

//用户兑换礼品券
export function getGiftExchange(id) {
    return request({
        url: '/user/exchange_gift_coupon/'+ id,
    })
}

//用户礼品券列表
export function getGiftList(page,status) {
    return request({
        url: '/user/gift_coupons',
        params:{
            page,
            status,
        }
    })
}



