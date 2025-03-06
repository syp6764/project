    function sendSns(sns, txt, url)
    {
        var o;
        var _url = encodeURIComponent(url);
        var _txt = encodeURIComponent(txt);
        var _br  = encodeURIComponent('\r\n');
     
        switch(sns)
        {
            case 'facebook':
                o = {
                    method:'popup',
                    url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
                };
                break;
     
            case 'twitter':
                o = {
                    method:'popup',
                    url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
                };
                break;

            case 'google':
            	o = {
                    method:'popup',
                    url:'https://plus.google.com/share?url=' + _url + '&t=' + _txt
                };
                break;
            case 'band':
                o = {
                    method:'web2app',
                    param:'create/post?text=' + _txt + _br + _url,
                    a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
                    g_store:'market://details?id=com.nhn.android.band',
                    a_proto:'bandapp://',
                    g_proto:'scheme=bandapp;package=com.nhn.android.band'
                };
                break;
     
            default:
                alert('지원하지 않는 SNS입니다.');
                return false;
        }
     
        switch(o.method)
        {
            case 'popup':
                window.open(o.url);
                break;
     
            case 'web2app':
                if(navigator.userAgent.match(/android/i))
                {
                    // Android
                    setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
                }
                else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i))
                {
                    // Apple
                    setTimeout(function(){ location.href = o.a_store; }, 200);          
                    setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
                }
                else
                {
                    alert('이 기능은 모바일에서만 사용할 수 있습니다.');
                }
                break;
        }
    }    