var HUIBAO_HOST_URL = "https://api2.renrenbx.com";
module.exports={
  huibao_host_userinfo: HUIBAO_HOST_URL +'/mobile/wxinfo/getOpenId',//首页获取userinfo和openid
  huibao_host_hotsearch: HUIBAO_HOST_URL +'/mobile/miniapps/policychecker/hotlist',//获取热门搜索列表
  huibao_host_searchResulst: HUIBAO_HOST_URL +'/mobile/miniapps/policychecker/complist',//获取搜索结果页面数据
  huibao_host_searchResultDetail: HUIBAO_HOST_URL +'/mobile/miniapps/policychecker/compintro',//查看保险公司详情
  huibao_host_calling: HUIBAO_HOST_URL + '/mobile/miniapps/policychecker/onekeydial',//一键拨号--打电话
}