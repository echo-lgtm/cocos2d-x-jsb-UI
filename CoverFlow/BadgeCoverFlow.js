/**
 * User: echo
 * Date: 12/18/13
 * Time: 10:40 AM
 *
 */

var page = 1;

var layer;

var dotsNum = 5;
//判断加载的page是奇偶数
var isEven = true;
var BadgeCoverFlow = function () {

};


BadgeCoverFlow.prototype.onDidLoadFromCCB = function () {

    this.rootNode.setTouchEnabled(true);
    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };

    this.rootNode.onTouchesEnded = function (touches, event) {
        this.controller.onTouchesEnded(touches, event);
        return true;
    };

    this.rootNode.onMouseDragged = function (event) {
        this.controller.onMouseDragged(event);
        return true;
    };


    var badgeNum = 5;
    layer = cc.Layer.create();
    for (var i = 1; i <= badgeNum; i++) {

        var frame = cc.Sprite.create("Card_Badge_Vowels_E_Detail_Small(1).png");
        frame.setAnchorPoint(cc.p(0.5, 0.5));
        frame.setPosition(cc.p(160 + (i - 1) * (frame.getContentSize().width / 2 + (gWinSize.width / 2 - 19)), 259));
        frame.setTag(i);
        layer.addChild(frame);
    }
    layer.setContentSize(cc.size(gWinSize.width * badgeNum, 480));
    scrollView = cc.ScrollView.create(cc.size(320, 480), layer);
    scrollView.setAnchorPoint(cc.p(0.5, 0.5));
    scrollView.setPosition(cc.p(0, 0));
    scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
    scrollView.setTouchEnabled(false);

    scrollView.setDelegate(this);
    this.rootNode.addChild(scrollView);


    var currentSprite = layer.getChildByTag(1);
    currentSprite.setScale(1.3);

    if (dotsNum % 2 != 0) {
        isEven = false;
    }

    for (var j = 1; j <= dotsNum; j++) {
        var strokeDot = cc.Sprite.create("Indicator_Page_Stroke.png");
        strokeDot.setTag(j);
        strokeDot.setAnchorPoint(cc.p(0, 0));
//        strokeDot.setPosition(cc.p((gWinSize.width - dotsNum * strokeDot.getContentSize().width)/2 +16*(j-1),86));
        if (isEven) {
            strokeDot.setPosition(cc.p(gWinSize.width / 2 - (dotsNum / 2 * 8 + dotsNum / 2 * strokeDot.getContentSize().width - 4) + (8 + strokeDot.getContentSize().width) * (j - 1), 86));
        } else {
            strokeDot.setPosition(cc.p(gWinSize.width / 2 - ((dotsNum - 1) / 2) * ( strokeDot.getContentSize().width + 8) - strokeDot.getContentSize().width / 2 + (8 + strokeDot.getContentSize().width) * (j - 1), 86));
        }

        this.rootNode.addChild(strokeDot);
    }

    var filledDot = this.rootNode.getChildByTag(1);
    var texture = cc.TextureCache.getInstance().addImage("Indicator_Page_Fill.png");
    filledDot.setTexture(texture);
};


BadgeCoverFlow.prototype.registerWithTouchDispatcher = function () {
    cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 1, true);
};

BadgeCoverFlow.prototype.scrollViewDidScroll = function (view) {
};


BadgeCoverFlow.prototype.scrollViewDidZoom = function (view) {
};

BadgeCoverFlow.prototype.onTouchesBegan = function (touches, event) {
    pos = touches[0].getLocation().x;

    return true;
};

BadgeCoverFlow.prototype.onTouchesEnded = function (touches, event) {
    var p = touches[0].getLocation().x - pos;
    cc.log(p);
    var pic1 = layer.getChildByTag(page);
    pic1.setScale(1.0);

    var strokeDot = this.rootNode.getChildByTag(page);
    var texture = cc.TextureCache.getInstance().addImage("Indicator_Page_Stroke.png");
    strokeDot.setTexture(texture);

    if (p < -40) {
        page++;


    } else if (p > 40) {
        page--;

    }
    if (page < 1) {
        page = 1;

    } else if (page > 5) {
        page = 5;
    }
//
    var pic2 = layer.getChildByTag(page);
    pic2.setScale(1.3);
    var frame = cc.Sprite.create("Card_Badge_Vowels_E_Detail_Small(1).png");

    var filledDot = this.rootNode.getChildByTag(page);
    var texture2 = cc.TextureCache.getInstance().addImage("Indicator_Page_Fill.png");
    filledDot.setTexture(texture2);


    scrollView.setContentOffset(cc.p(-(page - 1) * (frame.getContentSize().width / 2 + (gWinSize.width / 2 - 19)), 0), true);

};


BadgeCoverFlow.prototype.backToGameMenu = function () {
    var scene = cc.BuilderReader.loadAsScene("GameMenuScene.ccbi");
    cc.Director.getInstance().replaceScene(scene);

};