/*
* 鍊掕鏃� 灏忔彃浠�
* @since 2018/11/7 12:39
* @author FlyTiger
* */
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? (function(){ define(["jquery"],factory);global.countDown = factory();})() : (global.countDown = factory());
})(this, function () {
    var ___=window;
    //妯℃澘
    var $defaultTitle=["璺濈","寮€濮�","杩樻湁"];
    var $template="<span class=\"active-time pull-right\"><t class='time_prefix'></t><em class=\"time_d\"></em>天<em class=\"time_h\"></em>:<em class=\"time_m\"></em>:<em class=\"time_s\"></em><t class='time_suffix'></span>";

    //浜嬩欢
    var events={
        started:"countDownStarted",//寮€鍚�
        ended:"countDownEnded",//缁撴潫
        restarted:"countDownRestarted"//閲嶅惎
    };

    //鏂规硶
    var fns={
        //鏍囬澶勭悊
        _title:function(){
            var _opts=this.opts;
            var $prefix=this.$timeEms_.$prefix,$suffix=this.$timeEms_.$suffix;
            if((_opts.title&&_opts.title.length)||(!_opts.prefix&&!_opts.suffix)){
                var _1= [].concat($defaultTitle);
                _1.splice(1,1,_opts.title||$defaultTitle[1]);
                $prefix.html(_1.join(""));
            }else{
                $prefix.html(_opts.prefix||"");
                $suffix.html(_opts.suffix||"");
            }
        },
        //鍒濆鍖�
        prepare:function(){
            fns._title.call(this);
            fns._f.call(this);
        },
        _f:function () {
            var _this=this;
            var time_end=this.opts.time_end||new Date().getTime();
            var _ems=this.$timeEms_;
            var f_=function _f(_time_end){
                var time_start = new Date().getTime(); //璁惧畾褰撳墠鏃堕棿
                var time_end =  new Date(_time_end).getTime(); //璁惧畾鐩爣鏃堕棿
                // 璁＄畻鏃堕棿宸�
                var time_distance = time_end - time_start;
                if(time_distance<1){
                    if(_this._timestamp_){
                        clearTimeout(_this._timestamp_);
                    }
                    _this._runing++;
                    _this.$container_.hide().triggerHandler(events.ended,[_this._runing,time_start]);
                    return false;
                }
                // 澶�
                var int_day = Math.floor(time_distance/86400000)
                time_distance -= int_day * 86400000;
                // 鏃�
                var int_hour = Math.floor(time_distance/3600000)
                time_distance -= int_hour * 3600000;
                // 鍒�
                var int_minute = Math.floor(time_distance/60000)
                time_distance -= int_minute * 60000;
                // 绉�
                var int_second = Math.floor(time_distance/1000)
                // 鏃跺垎绉掍负鍗曟暟鏃躲€佸墠闈㈠姞闆�
                if(int_day < 10){
                    int_day = "0" + int_day;
                }
                if(int_hour < 10){
                    int_hour = "0" + int_hour;
                }
                if(int_minute < 10){
                    int_minute = "0" + int_minute;
                }
                if(int_second < 10){
                    int_second = "0" + int_second;
                }
                // 鏄剧ず鏃堕棿
                _ems.$d.html(int_day);
                _ems.$h.html(int_hour);
                _ems.$m.html(int_minute);
                _ems.$s.html(int_second);
                // 璁剧疆瀹氭椂鍣�
                if(_this._timestamp_){
                    clearTimeout(_this._timestamp_);
                }
                _this._timestamp_=setTimeout(function (_) {
                    _f(_);
                },1000,_time_end);
            };
            if(this._runing){
                this.$container_.triggerHandler(events.restarted,[this._runing]);
            }else{
                this.$container_.triggerHandler(events.started,[this._runing]);
            }
            this.$container_.show();
            f_(time_end);
        }
    };
    /*
       * @param $container 鍊掕鏃跺鍣�
       * @param $opts 鍙傛暟{title,prefix,suffix,time_end},title浼樺厛绾ф渶楂�
       * */
    var CountDown=function ($container,$opts) {
        var $container=$container.empty().html($template).addClass("payment-time");
        // 鏄剧ず鏃堕棿
        this.$timeEms_={
            $d:$(".time_d",$container),
            $h:$(".time_h",$container),
            $m:$(".time_m",$container),
            $s:$(".time_s",$container),
            $prefix:$(".time_prefix",$container),
            $suffix:$(".time_suffix",$container),
        };
        this.$container_=$container;
        this.opts=$opts||{};
        this._runing=0;//鍒濆鎵ц
        //鍒濆鍖�
        fns.prepare.call(this);
    };

    //閲嶆柊璁剧疆鍙傛暟
    CountDown.prototype.setOpts=function($opts){
        this.opts=$.extend(this.opts, $opts||{});
        this._runing++;
        fns.prepare.call(this);
    };

    //缁戝畾浜嬩欢
    CountDown.prototype.on=function () {
        ___.jQuery.fn.on.apply(this.$container_,arguments);
        if(this._runing<1){
            this.$container_.triggerHandler(events.started,[this._runing]);
        }
        return this;
    };
    //瑙ｉ櫎浜嬩欢
    CountDown.prototype.off=function () {
        ___.jQuery.fn.off.apply(this.$container_,arguments);
        return this;
    };

    return function($container,$opts){
        if(!___.jQuery){
            throw new Error("jQuery is required for this plugin");
        }
        if(!$container||!$container.length){
            throw new Error("The container you given is not useful!");
        }
        return new CountDown($container,$opts);
    }
});