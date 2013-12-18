/**
 * User: echo
 * Date: 12/9/13
 * Time: 5:13 PM
 *
 */

var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var TableViewTestLayer = cc.Layer.extend({
    init: function () {
        if (!this._super()) {
            return false;
        }

        tableView = cc.TableView.create(this, cc.size(300, 350));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(cc.p(40, gWinSize.height / 2 - 150));


        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();

        return true;

    },

    scrollViewDidScroll: function (view) {
    },

    scrollViewDidZoom: function (view) {
    },

    tableCellTouched: function (table, cell) {

    },

    tableCellSizeForIndex:function (table, idx) {

        return cc.size(60, 60);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = tableContent[idx].time;
        cc.log(strValue);
        var cell = table.dequeueCell();
        var pic;
        var label;

        if(!cell){
            cell = new CustomTableViewCell();
            label = cc.LabelTTF.create(strValue, "Helvetica", 20.0);

            label.setPosition(cc.p(0,0));
            label.setAnchorPoint(cc.p(0,0));
            label.setTag(123);
            cell.addChild(label);

        }else{
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }

        return cell;
    } ,

    numberOfCellsInTableView:function (table) {
        return tableContent.length;
    }


});


TableViewTestLayer.create = function () {
    var retObj = new TableViewTestLayer();

    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;

};


var TableViewTest = function () {
    var pScene = cc.Scene.create();
    //new 一个 layer ，把控件放到 layer 上，在把 layer 放到 cell 上
    var TableViewLayer = TableViewTestLayer.create();
    pScene.addChild(TableViewLayer);
    cc.Director.getInstance().replaceScene(pScene);

};


var tableContent=[
    {
       score:2000,
       time:"11/12"
    },
    {
        score:2011,
        time:"11/12"
    },
    {
        score:2012,
        time:"11/12"
    },
    {
        score:2013,
        time:"11/12"
    },
    {
        score:2014,
        time:"11/12"
    },
    {
        score:2015,
        time:"11/12"
    },
    {
        score:2016,
        time:"11/12"
    },
    {
        score:2017,
        time:"11/12"
    },
    {
        score:2018,
        time:"11/12"
    },
    {
        score:2019,
        time:"11/12"
    },
    {
        score:2020,
        time:"11/12"
    },
    {
        score:2021,
        time:"14/12"
    }


];
