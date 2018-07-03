$(function() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    var half10 = (function() {
      var isLogin = $("#isLogin").val(),
        userMobile = $("#userMobile").val(),
        isMember = $("#isMember").val(),
        userId = $("#userId").val(),
        //payorderStatus = $.getUrlParam("payorderStatus"),
        payorderStatus = '',
        channelidDefault = $("#channelid").val(),
        //channelid = $.getUrlParam("channelid");
        channelid = '';
      var status1 = "",
        status2 = "",
        status3 = "",
        status4 = "",
        status5 = "";
      var init_page = function() {
          /*if (payorderStatus == "success") {
            if (isMember == "1") {
              tsShow("1000");
              logicalJudge();
            }
          } else {
            logicalJudge();
          }*/
  
          if (payorderStatus == "success"){
            pricing_isOrder10();
          }
          logicalJudge();
          showData();
        },
        showData = function() {
          tsInit();
          ruleInit();
          downloadClient();
          getPageData(function(data) {
            $(".rule-cont-txt").html(data.gameRule);
            var half10Content = data.half10Content;
            half10Content.forEach(function(object, index) {
              var configV = object.VALUE;
              switch (configV) {
                case "0":
                  $("#bg01").attr('src', object.img[0]);
                  $("#bg02").attr('src', object.img[1]);
                  $("#bg03").attr('src', object.img[2]);
                  break;
                case "2":
                  var sectionInfo = object.sectionInfo;
                  sectionInfo.forEach(function(o, i) {
                    var element = $(".article-little li").eq(i);
                    var $img = element.find('img');
                    $img.attr('src', o.img[0]);
                    var str = "<a href='" + o.REDREICT_URL + "'></a>";
                    $img.wrap(str);
                    var $p = element.find('p');
                    $p.html(o.name);
                  });
                  break;
                case "3":
                  var element = $(".swiper-wrapper");
                  var sectionInfo = object.sectionInfo;
                  sectionInfo.forEach(function(o, i) {
                    var $div = $('<div></div>');
                    $div.addClass('swiper-slide');
                    var $img = $("<img />").attr('src', o.img[0]);
                    $img.appendTo($div);
                    var str = "<a href='/wap/resource/migu/detail/Detail_live.jsp?cid=" + o.SRC_CONT_ID + "'></a>";
                    $img.wrap(str);
                    var $p = $("<p></p>").html(o.name);
                    $p.appendTo($div);
                    element.append($div);
                  });
                  break;
                case "4":
                  var sectionInfo = object.sectionInfo;
                  sectionInfo.forEach(function(o, i) {
                    var element = $(".article-big li").eq(i);
                    var $img = element.find('img');
                    $img.attr('src', o.img[0]);
                    var $p = element.find('p');
                    var str = "<a href='/wap/resource/migu/miguH5/detail/detail.jsp?cid=" + o.SRC_CONT_ID + "'></a>";
                    $img.wrap(str);
                    $p.html(o.name);
                  });
                  break;
                case "5":
                  $("#bgRule").attr('src', object.img[0]);
                  break;
                case "6":
                  $(".ts").css("background-image", "url(" + object.img[0] + ") no-repeat");
                  var sectionInfo = object.sectionInfo;
                  sectionInfo.forEach(function(o, i) {
                    var v = o.VALUE;
                    switch (v) {
                      case "01":
                        status1 = o.NAME;
                        break;
                      case "02":
                        status2 = o.NAME;
                        break;
                      case "03":
                        status3 = o.NAME;
                        break;
                      case "04":
                        status4 = o.NAME;
                        break;
                      case "05":
                        status5 = o.NAME;
                        break;
                    }
                  });
                  break;
              }
            });
            $.weixinSecondShare(data.shareTitle, '', data.sharePic);
            
            console.log(data);
          });
        },
        logicalJudge = function() {
          var $openHalfVip = $("#openHalfVip");
          $openHalfVip.on("click", function() {
            if (isLogin == "1") {
              pricing(); //询价
            } else {
              var backurl = location.href.replace("http://", "").replace("https://", "");
              window.location.href = "https://passport.migu.cn/login?sourceid=203005&apptype=2&forceAuthn=true&isPassive=false&authType=&display=&callbackURL=" + backurl + "&relayState=login";
            }
          });
        },
        pricing_isOrder10 = function() {
          var request = [{
            "channelId": channelidDefault,
            "goodsType": "MIGU_MEMBER",
            "userId": userId,
            "count": "1",
            "productIds": "2028600738",
            "goodsId": "2028600738",
            "goodsProperties": {
              "phoneNumber": userMobile
            }
          }];
          $.ajax({
            url: "/sales/pricing",
            headers: {
              "version": "v1.3.*"
            },
            data: {
              request: JSON.stringify(request),
              clientId: "123456789"
            },
            type: "POST",
            dataType: "json",
            success: function(data) {
              console.log(data);
              if (data.resultCode == "ACCEPTED") {
                var priceList = data.pricing[2028600738];
                $.each(priceList, function(index, value) {
                  if (value.resultCode == "SUCCESS") {
  
                  } else {
                    var errorCode = value.errorCode;
                    switch (errorCode) {
                      case "10002":
                        console.log("已经订购过特惠包月10元");
                        tsShow("1000");
                        break;
                      default:
                        console.log("code=" + code);
                    }
                  }
                });
              }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
            }
          });
        },
        pricing = function() {
          var request = [{
            "channelId": channelidDefault,
            "goodsType": "MIGU_MEMBER",
            "userId": userId,
            "count": "1",
            "productIds": "2028600738",
            "goodsId": "2028600738",
            "goodsProperties": {
              "phoneNumber": userMobile
            }
          }];
          $.ajax({
            url: "/sales/pricing",
            headers: {
              "version": "v1.3.*"
            },
            data: {
              request: JSON.stringify(request),
              clientId: "123456789"
            },
            type: "POST",
            dataType: "json",
            success: function(data) {
              console.log(data);
              if (data.resultCode == "ACCEPTED") {
                var priceList = data.pricing[2028600738];
                $.each(priceList, function(index, value) {
                  if (value.resultCode == "SUCCESS") {
                    var strLis = JSON.stringify(value);
                    var payMentList = value.payments;
                    $.each(payMentList, function(innerIndex, innerValue) {
                      if (innerValue.code === "SUNNY_V6_MOBILE_BOSS") { //话费支付（阳光支付）
                        userOrder(strLis); //订购
                      }
                    });
                  } else {
                    var errorCode = value.errorCode;
                    switch (errorCode) {
                      case "10001":
                        console.log("没有订购过世界杯畅享会员");
                        tsShow("1001");
                        break;
                      case "10002":
                        console.log("已经订购过特惠包月10元");
                        if (payorderStatus == "success"){
                          tsShow("1000");
                        }else{
                          tsShow("1003");
                        }
                        break;
                      case "10003":
                        console.log("已是连续订购会员");
                        tsShow("1002");
                        break;
                      default:
                        console.log("code=" + code);
                    }
                  }
                });
              }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
            }
          });
        },
        userOrder = function(str) {
          var data = JSON.parse(str);
          var productName = data.serviceInfo.name,
            productDesc = data.serviceInfo.name,
            goodsId = "2028600738",
            productID = "2028600738",
            subtypes = data.mainDeliveryItem.data.subtype,
            salesType = data.serviceInfo.salesType,
            code = data.serviceInfo.code,
            handler = data.mainDeliveryItem.handler,
            authType = data.mainDeliveryItem.authorization.authType,
            periodUnit = data.mainDeliveryItem.authorization.periodUnit,
            traceIds = data.mainDeliveryItem.data.traceId,
            paymentCode = data.payments[0].code,
            lastPrice = "",
            extDeliveryItemsss = [],
          //returnUrl = channelid ? "http://117.131.17.174:8083/wap/resource/migu/worldCup/half10.jsp?payorderStatus=success&channelid=" + channelid : "http://117.131.17.174:8083/wap/resource/migu/worldCup/half10.jsp?payorderStatus=success";
            returnUrl = channelid ? "https://m.miguvideo.com/wap/resource/migu/worldCup/half10.jsp?payorderStatus=success&channelid=" + channelid : "https://m.miguvideo.com/wap/resource/migu/worldCup/half10.jsp?payorderStatus=success";
          $.each(data.payments, function(index, value) {
            if (value.code === paymentCode) {
              lastPrice = value.amount;
              Ordercode = value.charge.cpCode;
              operCode = value.charge.operCode;
              operType = value.charge.operType;
              if (value.payDeliveryItems.length != 0) {
                for (var i = 0; i < value.payDeliveryItems.length; i++) {
                  extDeliveryItemsss[i] = value.payDeliveryItems[i];
                }
              }
            }
          });
          if (lastPrice < 0) {
            lastPrice = data.lastPrice;
          }
          if (extDeliveryItemsss.length == 0) {
            for (var i = 0; i < data.extDeliveryItems.length; i++) {
              extDeliveryItemsss[i] = data.extDeliveryItems[i];
            }
          } else {
            for (var i = 0; i < data.extDeliveryItems.length; i++) {
              extDeliveryItemsss[extDeliveryItemsss.length + i] = data.extDeliveryItems[i];
            }
          }
          extDeliveryItemsss = JSON.stringify(extDeliveryItemsss);
          $.ajax({
            url: "/agentOrder/order/userOrderCommon",
            type: "post",
            dataType: "json",
            async: false,
            data: {
              isWebSDK: true, //sunny
              bidappName: "miguvideo_H5", //sunny
              appName: "MIGU_VIDEO",
              clientId: "123456789",
              name: productName,
              desc: productDesc,
              autoSubscription: true,
              paymentCode: paymentCode, //sunny
              count: 1,
              productDesc: productDesc,
              content_node: "",
              contentID: 0,
              goodsId: goodsId,
              productID: productID,
              type: "MIGU_MEMBER",
              phone: userMobile,
              needDeliver: true,
              prolongAuthSupport: true,
              subtype: subtypes,
              salesType: salesType,
              site: "SITE_001",
              userId: "",
              operCode: "",
              cpCode: "",
              productName: productName,
              //code: "MiGuShiPinHe4GTeHuiHuiYuanBaoYueHuaFei-INL2HAHK-8Y1802B9",
              code: code,
              handler: handler,
              salesPrice: lastPrice,
              rawPrice: "",
              bitamount: lastPrice,
              amount: lastPrice,
              authType: authType,
              periodUnit: periodUnit,
              cpCode: Ordercode,
              operCode: operCode,
              extDeliveryItems: extDeliveryItemsss,
              traceId: traceIds,
              mainDeliveryItem: JSON.stringify(data.mainDeliveryItem),
              properties: JSON.stringify({
                productName: data.serviceInfo.name,
                productDesc: data.serviceInfo.name
              }),
              salesType: "NORMAL",
              channelId: channelidDefault,
              operType: operType, //sunny
              returnUrl: returnUrl //sunny
            },
            success: function(data) {
              console.log(data);
              if (data.orderRsp) {
                if (data.orderRsp.resultCode == "ACCEPTED") {
                  var payUrl = data.orderRsp.order.currentPaymentInfo.subPaymentInfoList[0].extData.webPayUrl;
                  if (payUrl) {
                    location.href = payUrl;
                  } else {
                    tsShow("1004");
                  }
                }
              }
            }
          });
        },
        tsShow = function(code) {
          switch (code) {
            case "1000":
              $(".ts-cont").html(status4 == "" ? "您已经成功开通钻石会员，立即体验吧！" : status4);
              $(".ts-btn").show();
              $(".ts-btn2").hide();
              break;
            case "1001":
              $(".ts-cont").html(status3);
              $(".ts-btn").hide();
              $(".ts-btn2").show();
              break;
            case "1002":
              $(".ts-cont").html(status1);
              $(".ts-btn").show();
              $(".ts-btn2").hide();
              break;
            case "1003":
              $(".ts-cont").html(status2);
              $(".ts-btn").show();
              $(".ts-btn2").hide();
              break;
            case "1004":
              $(".ts-cont").html(status5);
              $(".ts-btn").show();
              $(".ts-btn2").hide();
              break;
          }
          $(".pop").show();
          $(".ts").show();
        },
        tsInit = function() {
          var $sure01 = $("#sure01");
          var $sure02 = $("#sure02");
          var $seeOthers = $("#seeOthers");
          $sure01.on("click", function() {
            $(".pop").hide();
            $(".ts").hide();
          });
          $sure02.on("click", function() {
            $(".pop").hide();
            $(".ts").hide();
          });
          $seeOthers.on("click", function() {
            location.href = "/wap/resource/migu/VIP/pay_order.jsp";
          });
        },
        ruleInit = function() {
          var $openRule = $("#openRule");
          var $closeRule = $("#closeRule");
          $openRule.on("click", function() {
            $(".pop").show();
            $(".rule").show();
          });
          $closeRule.on("click", function() {
            $(".pop").hide();
            $(".rule").hide();
          });
        },
        getPageData = function(cb) {
          $.ajax({
            url: "data/half10Data.jsp",
            data: {},
            success: function(data) {
              cb && cb(data);
            },
            eror: function(data) {
              console.log(data);
            }
          })
        },
        downloadClient = function() {
          $("#downloadClient").on("click", function() {
            var appUrl = "miguvideo://miguvideo?path=detail&contentId=628734809&objType=video";
            var downloadUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.cmcc.cmvideo&android_schema=miguvideo%3A%2F%2Fmiguvideo%3Fpath%3Ddetail%26contentId%3D629256485%26objType%3Dvideo";
            $.loadDat(appUrl, downloadUrl);
          });
        };
      return {
        init_page: init_page
      }
    })();
    half10.init_page();
  })