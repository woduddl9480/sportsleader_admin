$(function () {
    //Date picker
    $('#datepicker').datepicker({
        autoclose: true
    });

    $('.datepicker').datepicker({
        format: "yyyymmdd",
        autoclose: true
    });

    $('.datepickerDash').datepicker({
        dateFormat: "yy-mm-dd",
        autoclose: true,
        changeYear: true,
        changeMonth: true,
        showMonthAfterYear: true, // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 요일의 한글 형식.
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] // 월의 한글 형식.
    });

    //gnb
    $('#header .gnb>li').bind('mouseover', function () {
        $('#header .gnb>li').removeClass('on')
        $(this).children('div').css('display', 'block')
        $(this).addClass('on')

    }).mouseleave(function () {
        $(this).children('div').css('display', 'none');
        $(this).removeClass('on')
    });
    ;

    //main gnb
    $('#header.main').bind('mouseover', function () {
        $('#header.main').css('background', '#fff')
        $('#header.main ul>li>a').css('color', '#333333')
        $('#header.main ul>li.on>a').css('color', '#00a1f2')
        $('#header.main h1 img').attr("src", $(this).find('img').attr("src").replace(/_off\.png$/, '_on.png'));

    }).mouseleave(function () {
        $('#header.main').css('background', 'rgba(0,0,0,0.4)')
        $('#header.main ul>li>a').css('color', '#fff')
        $('#header.main h1 img').attr("src", $(this).find('img').attr("src").replace(/_on\.png$/, '_off.png'));
    });
    //sub navi
    $('.location li.dropdown').bind('click', function (event) {
        /* Act on the event */
        $(this).children('ul').toggle()
    });

    /**
     * jQuery Ajax Interceptor
     */
    $(document)
        .ajaxStart(function () {
            $.blockUI({
                message: '<img src="' + location.origin + '/' + cRoot + '/img/loading2.png" border="0" alt="loader">',
                css: {backgroundColor: 'rgba(0,0,0,0.0)', border: '0px solid #a00'}
            });
        })
        .ajaxStop(function () {
            $.unblockUI();
        })
        .ajaxSuccess(function (event, jqXhr, ajaxOptions, data) {
            var mode = !!mode ? mode : false;
            if (mode) {
                console.groupCollapsed('[jQuery Ajax Response]%c[' + jqXhr.statusText + '-' + jqXhr.status + ']', 'background-color:#58FA58; color:black');
                console.info('url: ' + ajaxOptions.url + '\n' +
                    'type: ' + ajaxOptions.type + '\n' +
                    'reqData: ' + decodeURIComponent(ajaxOptions.data).replace(/\+/g, ' ') + '\n' +
                    'resData: ', data);
                console.groupEnd();
            }
        })
        .ajaxError(function (event, jqXhr, settings, thrownError) {
            var mode = !!mode ? mode : false;
            if (mode) {
                console.groupCollapsed('[jQuery Ajax Response]%c[' + jqXhr.statusText + '-' + jqXhr.status + ']', 'background-color:#FA5858; color:black');
                console.info('url: ' + settings.url + '\n' +
                    'type: ' + settings.type + '\n' +
                    'reqData: ' + decodeURIComponent(settings.data).replace(/\+/g, ' ') + '\n' +
                    'resText: ' + jqXhr.responseText);
                console.groupEnd();
            }
        });

    var _this = $(".quick");
    var _this2 = _this.outerHeight();
    var currentPosition = parseInt($(".quick").css("top"));
    var e_pageY = $(".contentArea").outerHeight();
    $(window).scroll(function () {
        var position = $(window).scrollTop(); // 현재 스크롤바의 위치값을 반환합니다.
        //                console.log(_this.outerHeight());
        if (position + _this.outerHeight() < e_pageY) {
            $(".quick").stop().animate({
                'top': position + currentPosition + "px"
            });

        } else {
            $(".quick").stop().animate({
                "top": e_pageY - _this.outerHeight() + "px"
            });
        }
    });

    //tab
    /*
    $('.tab_content').eq(0).show()

    $('.tab li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.tab_content').eq($(this).index()).show().siblings('.tab_content').hide()
    })*/
    //modal
    $('#btn_modal').click(function (event) {
        $("#myModal").css('display', 'block');
    });
    $('.modal-header .close').click(function (event) {

        $("#myModal").css('display', 'none');
    });
})

function displaySelectMemberGroup(id, init, pms) {
    getCommonCode(id, init, pms, 1, '사용자그룹');
}

function displaySelectPlaceDiv(id, init, pms) {
    getCommonCode(id, init, pms, 24, '장소');
}

function displaySelectSido(id, init, pms) {
    getCommonCode(id, init, pms, 2, '시도');
}

function displayPhoneExchangeNumber(id, init, pms) {
    getCommonCodeValue(id, init, pms, 5, '선택');
}


function displaySelectSigungu1(id, sidoCd, init, pms) {
    $.ajax({
        "url": cRoot + '/common/getSigunguList.do',
        "type": "POST",
        "data": {sidoCd: sidoCd, use_yn: 'Y'},
        "dataType": "json",
        async: false,
    })
        .done(function (data) {
            var data = data.result;
            var sidoId = $("#" + id);
            if (pms != "" && pms != null) {
                var option = "";
                for (var i = 0; i < data.length; i++) {
                    var rst = data[i];
                    if (rst.sigunguCd == pms) {
                        option = $("<option value='" + rst.sigunguCd + "' selected='selected'>" + rst.sigunguAreaNm2 + "</option>");
                        break;
                    }
                }
                sidoId.html(option);
            } else {
                var option = "<option value=''>시군구 전체</option>";
                for (var i = 0; i < data.length; i++) {
                    var rst = data[i];
                    if (rst.sigunguCd == init) {
                        option += "<option value='" + rst.sigunguCd + "' selected='selected'>" + rst.sigunguAreaNm2 + "</option>";
                    } else {
                        option += "<option value='" + rst.sigunguCd + "'>" + rst.sigunguAreaNm2 + "</option>";
                    }
                }
                sidoId.html(option);
                //option 추가후 계속 하단으로 이동하여 강제로 0번 옵션 지정
                //$("#"+id+" option:eq(0)").attr("selected","selected");
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        return;
    });
}

function displaySelectSigunguJoin(id, sidoCd, init, pms) {
    if (sidoCd == '') {
        $("#" + id).html("<option value=''>시군구 전체</option>");
    } else {
        $.ajax({
            "url": cRoot + '/join/getSigunguList.do',
            "type": "POST",
            "data": {sidoCd: sidoCd, use_yn: 'Y'},
            "dataType": "json",
            async: false,
        })
            .done(function (data) {
                var data = data.result;
                var sidoId = $("#" + id);
                if (pms != "" && pms != null) {
                    var option = "";
                    for (var i = 0; i < data.length; i++) {
                        var rst = data[i];
                        if (rst.sigunguCd == pms) {
                            option = $("<option value='" + rst.sigunguCd + "' selected='selected'>" + rst.sigunguAreaNm2 + "</option>");
                            break;
                        }
                    }
                    sidoId.html(option);
                } else {
                    var option = "<option value=''>시군구 전체</option>";
                    for (var i = 0; i < data.length; i++) {
                        var rst = data[i];
                        if (rst.sigunguCd == init) {
                            option += "<option value='" + rst.sigunguCd + "' selected='selected'>" + rst.sigunguAreaNm2 + "</option>";
                        } else {
                            option += "<option value='" + rst.sigunguCd + "'>" + rst.sigunguAreaNm2 + "</option>";
                        }
                    }
                    sidoId.html(option);
                    //option 추가후 계속 하단으로 이동하여 강제로 0번 옵션 지정
                    //$("#"+id+" option:eq(0)").attr("selected","selected");
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("오류발생 관리자문의바람.");
            return;
        });
    }
}

function setPaging(selector, cpage, data, pn) {
    if(data==null||data==''){
        $(selector).html('');
    } else {
        data.totalcount = !!data.totalCount ? data.totalCount : data.totalcount;
        data.totalpage = !!data.totalPage ? data.totalPage : data.totalpage;
        cpage = Number(cpage);
        var start = Math.floor((cpage - 1) / 10) * 10 + 1;
        var end = start + 9 < data.totalpage ? start + 9 : data.totalpage;
        var html = "";

        if (start - 1 > 0) {
            html += '<li class="arrow"><a href="javascript:' + pn + '(\'' + (start - 1) + '\');"><img src="' + cRoot + '/bo/img/pag_mlft.png" alt=""></a></li>';
        }
        if (cpage > 1) {
            html += '<li class="arrow"><a href="javascript:' + pn + '(\'' + (cpage - 1) + '\');"><img src="' + cRoot + '/bo/img/pag_lft.png" alt=""></a></li>';
        }
        for (var i = start; i <= end; i++) {
            if (i == cpage) {
                html += '<li class="active"><a href="javascript:' + pn + '(\'' + i + '\');">' + i + '</a></li>';
            } else {
                html += '<li><a href="javascript:' + pn + '(\'' + i + '\');">' + i + '</a></li>';
            }
        }
        if (cpage < data.totalpage) {
            html += '<li class="arrow"><a href="javascript:' + pn + '(\'' + (cpage + 1) + '\');"><img src="' + cRoot + '/bo/img/pag_rig.png" alt=""></a></li>';
        }
        if (end < data.totalpage) {
            html += '<li class="arrow"><a href="javascript:' + pn + '(\'' + (end + 1) + '\');"><img src="' + cRoot + '/bo/img/pag_mrig.png" alt=""></a></li>';
        }
        $(selector).html(html);
    }
}

function getChargeTell(id, init, pms, codeGroupSeq) {
    $.ajax({
        "url": cRoot + '/common/codeList.do',
        "type": "POST",
        "data": {codeGroupSeq: codeGroupSeq},
        "dataType": "json",
        async: false,
    })
        .done(function (data) {
            var data = data.result;
            var sidoId = $("#" + id);
            sidoId.append("<option value=''>선택</option>");
            for (var i = 0; i < data.length; i++) {
                var option = "";
                var rst = data[i];
                if (rst.code == init) {
                    option = "<option value='" + rst.code + "' selected='selected'>" + rst.code + "</option>";
                } else {
                    option = "<option value='" + rst.code + "'>" + rst.code + "</option>";
                }
                sidoId.append(option);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        return;
    });
}

function getCommonCode(id, init, pms, codeGroupSeq, allName) {
    $.ajax({
        "url": cRoot + '/common/codeList.do',
        "type": "POST",
        "data": {codeGroupSeq: codeGroupSeq},
        "dataType": "json",
        async: false,
    })
        .done(function (data) {
            var data = data.result;
            var sidoId = $("#" + id);
            if (pms != "" && pms != null) {
                for (var i = 0; i < data.length; i++) {
                    var option = "";
                    var rst = data[i];
                    if (rst.code == pms) {
                        option = "<option value='" + rst.code + "' selected='selected'>" + rst.codeNm + "</option>";
                    }
                    sidoId.append(option);
                }
            } else {
                sidoId.append("<option value=''>" + allName + " 전체</option>");
                for (var i = 0; i < data.length; i++) {
                    var option = "";
                    var rst = data[i];
                    if (rst.code == init) {
                        option = "<option value='" + rst.code + "' selected='selected'>" + rst.codeNm + "</option>";
                    } else {
                        option = "<option value='" + rst.code + "'>" + rst.codeNm + "</option>";
                    }
                    sidoId.append(option);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        return;
    });
}

function getCommonCode2(id, init, pms, codeGroupSeq, allName) {
    $.ajax({
        "url": cRoot + '/common/codeList.do',
        "type": "POST",
        "data": {codeGroupSeq: codeGroupSeq},
        "dataType": "json",
        async: false,
    })
        .done(function (data) {
            var data = data.result;
            var sidoId = $("#" + id);
            if (pms != "" && pms != null) {
                for (var i = 0; i < data.length; i++) {
                    var option = "";
                    var rst = data[i];
                    if (rst.code == pms) {
                        option = "<option value='" + rst.code + "' selected='selected'>" + rst.codeNm + "</option>";
                    }
                    sidoId.append(option);
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    var option = "";
                    var rst = data[i];
                    if (rst.code == init) {
                        option = "<option value='" + rst.code + "' selected='selected'>" + rst.codeNm + "</option>";
                    } else {
                        option = "<option value='" + rst.code + "'>" + rst.codeNm + "</option>";
                    }
                    sidoId.append(option);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        return;
    });
}

/**
 * getCommonCode 함수에서 Option에 이름(codeNm) 대신에 code가 보여지게 된다.
 * @param id 결과값이 셋팅될 Html Element Id 값
 * @param init 결과값중에 선택될 code 값
 * @param pms 해당 code 값 외에 다른 결과값들은 노출되지 않음 (설정 시 init, allName이 작동하지 않는다.)
 * @param codeGroupSeq 서버에 요청할 codeGroupSeq
 * @param allName 선택하지 않았을 때의 Option 이름
 */
function getCommonCodeValue(id, init, pms, codeGroupSeq, allName) {
    $.ajax({
        'url': cRoot + '/common/codeList.do',
        'type': 'POST',
        'data': {codeGroupSeq: codeGroupSeq},
        'dataType': 'json',
        async: false
    })
        .done(function (data) {
            var result = data.result;
            var element = $('#' + id);
            if (pms) {
                result.forEach(function (item) {
                    if (item.code == pms) {
                        element.append('<option value="' + item.code + '" selected="selected">' + item.code + '</option>');
                    }
                });
            } else {
                element.append('<option value="">' + allName + '</option>');
                result.forEach(function (item) {
                    if (item.code == init) {
                        element.append('<option value="' + item.code + '" selected="selected">' + item.code + '</option>');
                    } else {
                        element.append('<option value="' + item.code + '">' + item.code + '</option>');
                    }
                });
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert('오류발생 관리자문의바람.');
        return;
    });
}

function memberList(sido, sigungu, leaderDiv, memberSeq) {
    $.ajax({
        url: cRoot + "/record/planReport/memberList.do",
        data: {"sidoCd": sido, "sigunguCd": sigungu, "curLeaderDiv": leaderDiv},
        dataType: "json",
        type: "post",
        async: false,
        success: function (data) {
            var result = data.result;
            var html = '<option value="">선택</option>';
            if (result.length === 0) {
                html = '<option>결과값 없음</option>';
            } else {
                for (var i = 0; i < result.length; i++) {
                    if (memberSeq === result[i].memberSeq) {
                        html = '<option value="' + result[i].memberSeq + '">' + result[i].memberNm + '</option>';
                        break;
                    } else {
                        if (result[i].memberNm !== 'null') {
                            html += '<option value="' + result[i].memberSeq + '">' + result[i].memberNm + '</option>';
                        }
                    }
                }
            }
            $("#groupMember").html(html);
        },
        error: function () {
            alert("관리자에게 문의하세요.");
        }
    });
}


/**
 * 지도자구분 출력
 * @params
 *  - id : 출력할 selectbox id
 *  - init : selected value
 *  - pms : 권한시도
 */
function displaySelectLeaderDiv(id, init, pms) {
    getCommonCode(id, init, pms, 11, '지도자구분');
}

/**
 * 셀렉트박스(년) 출력
 * @params
 *  - id : 출력할 selectbox id
 *  - init : selected value
 */
function displaySelectYear(id, init) {
    var yearId = $("#" + id);
    var Now = new Date();
    if (init == null) {
        init = Now.getFullYear();
    }
    for (var i = Now.getFullYear(); i >= 2014; i--) {
        var option = "";
        if (i == init) {
            option = $("<option value=" + i + " selected='selected'>" + i + "년</option>");
        } else {
            option = $("<option value=" + i + ">" + i + "년</option>");
        }
        yearId.append(option);
    }
}


/**
 * 셀렉트박스(월) 출력
 * @params
 *  - id : 출력할 selectbox id
 *  - init : selected value
 */
function displaySelectMonth(id, init) {
    var yearId = $("#" + id);

    var Now = new Date();
    if (init == null) {
        init = Now.getMonth() + 1;
    } else if (init.indexOf("+") != -1 || init.indexOf("-") != -1) {
        init = (Now.getMonth() + 1) + init * 1;
    }

    for (var i = 1; i <= 12; i++) {
        var option = "";
        if (i == init) {
            option = $("<option value=" + i + " selected='selected'>" + lpad(i, 2, '0') + "월</option>");
        } else {
            option = $("<option value=" + i + ">" + lpad(i, 2, '0') + "월</option>");
        }
        yearId.append(option);
    }
}


/**
 * 셀렉트박스(월) 출력
 * @params
 *  - id : 출력할 selectbox id
 *  - init : selected value
 */
function displaySelectMonth2(id, init) {
    var yearId = $("#" + id);

    var Now = new Date();
    if (init == null) {
        init = Now.getMonth() + 1;
    } else if (init.indexOf("+") != -1 || init.indexOf("-") != -1) {
        init = (Now.getMonth() + 1) + init * 1;
    }

    for (var i = 1; i <= 12; i++) {
        var option = "";
        if (i == init) {
            option = $("<option value=" + i + " selected='selected'>" + lpad(i, 2, '0') + "월</option>");
        } else {
            option = $("<option value=" + lpad(i, 2, '0') + ">" + lpad(i, 2, '0') + "월</option>");
        }
        yearId.append(option);
    }
}

/**
 * 좌측문자열채우기
 * @params
 *  - str : 원 문자열
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}


/**
 * 우측문자열채우기
 * @params
 *  - str : 원 문자열
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
function rpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str + "";
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str += padStr;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

/**
 * 숫자에 콤마넣기
 * @params
 *  - num : val
 */
function setComma(num) { // 숫자에 콤마 삽입  
    var len, point, str;

    num = num + "";
    point = num.length % 3
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str != "")
            str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    }
    return str;
}

/**
 * 숫자에 콤마넣기
 * @params
 *  - num : val
 */
function dateConvert(date) {
    if (date == null) {
        return "";
    } else {
        return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
    }
}

function null2blank(data) { // 숫자에 콤마 삽입  
    if (data == null) {
        return "";
    } else {
        return data;
    }
}

function YN2korean(data) { // 숫자에 콤마 삽입  
    if (data == 'Y') {
        return "예";
    } else {
        return "아니오";
    }
}

function formdataAjax(url, data, callback) {
    $.ajax({
        "url": url,
        "type": "POST",
        "data": data,
        "dataType": "json",
        "contentType": false,
        "processData": false,
        cache: false
    })
        .done(function (data) {
            callback(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        $.unblockUI();
        return;
    });

}

function formdataSyncAjax(url, data, callback) {
    $.ajax({
        "url": url,
        "type": "POST",
        "data": data,
        "async": false,
        "dataType": "json",
        "contentType": false,
        "processData": false,
        cache: false
    })
        .done(function (data) {
            callback(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        $.unblockUI();
        return;
    });

}

function serializeAjax(url, data, callback) {
    $.ajax({
        "url": url,
        "type": "POST",
        "data": data,
        "dataType": "json",
        cache: false
    })
        .done(function (data) {
            callback(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        $.unblockUI();
        return;
    });

}

function serializeSyncAjax(url, data, callback) {
    $.ajax({
        "url": url,
        "type": "POST",
        "data": data,
        "async": false,
        "dataType": "json",
        cache: false
    })
        .done(function (data) {
            callback(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        $.unblockUI();
        return;
    });

}


function displaySelectSido2(id) {
    $.ajax({
        "url": cRoot + '/common/codeList.do',
        "type": "POST",
        "data": {codeGroupSeq: 2},
        "dataType": "json",
    })
        .done(function (data) {
            var data = data.result;
            var sidoId = $("#" + id);
            sidoId.append("<option value=''>시도 선택</option>");
            for (var i = 0; i < data.length; i++) {
                var option = "";
                var rst = data[i];
                option = $("<option value='" + rst.code + "'>" + rst.codeNm + "</option>");
                sidoId.append(option);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        return;
    });
}

function displaySelectSigungu12(id, sidoCd) {
    $.ajax({
        "url": cRoot + '/common/getSigunguList.do',
        "type": "POST",
        "data": {sidoCd: sidoCd, use_yn: 'Y'},
        "dataType": "json",
    })
        .done(function (data) {
            var data = data.result;
            var sidoId = $("#" + id);
            var option = "<option value=''>시군구 전체</option>";
            for (var i = 0; i < data.length; i++) {
                var rst = data[i];
                option += "<option value='" + rst.sigunguCd + "'>" + rst.sigunguAreaNm2 + "</option>";
            }
            sidoId.html(option);
            //option 추가후 계속 하단으로 이동하여 강제로 0번 옵션 지정
            //$("#"+id+" option:eq(0)").attr("selected","selected");
        }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("오류발생 관리자문의바람.");
        return;
    });
}

function removeExtSelect(obj, val) {
    var html;
    $.each($(obj).find("option"), function (i, o) {
        if (o.value == val) {
            html = '<option value="' + o.value + '">' + o.text + '</option>';
        }
    });
    $(obj).html(html);
}

/**
 * object를 키 이름으로 정렬하여 반환
 * @param o
 */
function sortObject(o) {
    var sorted = {},
        key, a = [];
    // 키이름을 추출하여 배열에 집어넣음
    for (key in o) {
        if (o.hasOwnProperty(key)) a.push(key);
    }
    // 키이름 배열을 정렬
    a.sort();
    // 정렬된 키이름 배열을 이용하여 object 재구성
    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function openAddr() {
    window.open(cRoot + '/common/road.do', 'addr', 'width=450,height=680');
    return false;
}

function excelDownload(title, paramForm, fieldTitle, fieldName, queryId) {
    var x = $("#" + paramForm).serializeArray();
    var html = '';
    html += '<div id="excelDownloadModal" class="modal" style="display: block;">';
    html += '	<div class="modal-content" style="width: 800px;">';
    html += '		<form action="' + cRoot + '/common/commonExceldownload.do" id="excelDownloadFrm" name="excelDownloadFrm" method="post">';
    html += '			<input type="hidden" name="header" id="header" value="' + fieldTitle + '">';
    html += '			<input type="hidden" name="fieldName" id="fieldName" value="' + fieldName + '">';
    html += '			<input type="hidden" name="qurl" id="qurl" value="' + queryId + '">';
    $.each(x, function (i, v) {
        html += '			<input type="hidden" name="' + v.name + '" value="' + v.value + '">';
    });
    html += '			<div class="modal-header">';
    html += '				<span class="close" onclick="$(\'div\').remove(\'#excelDownloadModal\');">&times;</span>';
    html += '				<h2>' + title + ' 엑셀 다운로드</h2>';
    html += '			</div>';
    html += '			<div class="modal-body">';
    html += '				<table class="tbl">';
    html += '					<colgroup>';
    html += '						<col  width="12%" />';
    html += '						<col  width="35%" />';
    html += '					</colgroup>';
    html += '					<tr>';
    html += '						<th colspan="2"><em>*</em>개인정보의 안전성 확보조치 기준에 따라 개인정보가 포함된 자료의 다운로드 시 사유와 함께 접속기록이 보관됩니다.</th>';
    html += '					</tr>';
    html += '					<tr>';
    html += '						<th>다운로드 사유</th>';
    html += '						<td><input type="text" name="downloadReason" id="downloadReason"></td>';
    html += '					</tr>';
    html += '				</table>';
    html += '			</div>';
    html += '			<div class="modal-footer">';
    html += '				<div class="text-right">';
    html += '					<button type="button" class="btn btn_green" onclick="downloadBtn();">다운로드</button>';
    html += '					<button type="button" class="btn btn_defaultC" onclick="$(\'div\').remove(\'#excelDownloadModal\');">취소</button>';
    html += '				</div>';
    html += '			</div>';
    html += '		</form>';
    html += '	</div>';
    html += '</div>';
    $("section > .inner").append(html);
    return false;
}

function downloadBtn() {
    if ($.trim($("#downloadReason").val()) == '') {
        alert("사유를 입력해 주세요.");
        return false;
    }
    $("#excelDownloadFrm").submit();
}

// 테이블 그대로 엑셀 다운로드
function ReportToExcelConverter(addName) {
    var date = moment();
    var time = date.format('YYYYMMdHHmmss');
    var rowCnt = $("#TableToExcel tbody tr").length
    var fileName = !addName ? "Report_" + time + '.xls' : addName + "Report_" + time + '.xls';

    if (rowCnt === 0) {
        alert('출력할 데이터를 검색해 주세요.');
        return false;
    }
    $("#TableToExcel").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: fileName,
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });
}