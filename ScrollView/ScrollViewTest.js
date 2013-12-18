/**
 * User: echo
 * Date: 12/10/13
 * Time: 2:45 PM
 *
 */

var scrollView;

var page=0;
var pos;
var ScrollViewTestLayer = cc.Layer.extend({

    init: function () {
        if (!this._super()) {
            return false;
        }

        
        var pageNum=2;

        var layer=cc.Layer.create();

        for(var i=0;i<pageNum;i++){
            var frame = cc.Sprite.create("Bg_Register&Login.png");
            frame.setAnchorPoint(cc.p(0,0));
            frame.setPosition(cc.p(gWinSize.width*(i),0));
            layer.addChild(frame);
        }
        layer.setContentSize(cc.size(gWinSize.width*pageNum,480));
        scrollView = cc.ScrollView.create(cc.size(320, 480),layer);
        scrollView.setPosition(cc.p(0, 0));
        scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scrollView.setTouchEnabled(false);
        
        scrollView.setDelegate(this);
        this.addChild(scrollView);

      
        return true;
    },

     onEnter:function(){
        this._super();
        this.setTouchEnabled(true);
       
     },

   
    //call back
    registerWithTouchDispatcher: function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this,1, true);
    } ,

    scrollViewDidScroll : function (view) {

     },

    scrollViewDidZoom : function (view) {
        
    },

    onTouchesBegan : function(touches, event){
      
        pos=touches[0].getLocation().x;
        cc.log(pos);
        return true;
    },

    onTouchesEnded : function(touches, event){
     
        var p=touches[0].getLocation().x-pos;
        cc.log("p==>"+ p);
        if (p<0)
     {
        page ++;
        cc.log("a==>"+page);
        
     }else
     {
        page --;
        cc.log("b==>"+page);
     }
     if (page <1)
     {
        page = 0;

     }else if(page > 1)
     {
        page =1;
     }
        

     scrollView.setContentOffset(cc.p(-gWinSize.width*page,0),true);

    }


});


ScrollViewTestLayer.create = function () {
    var retObj = new ScrollViewTestLayer();

    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;


};


var ScrollViewTest = function () {
    var pScene = cc.Scene.create();
    var ScrollViewLayer = ScrollViewTestLayer.create();
    pScene.addChild(ScrollViewLayer);
    cc.Director.getInstance().replaceScene(pScene);
};
