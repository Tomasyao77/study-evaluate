/**
 * Created by zouy on 17-3-14.
 */
/**
 * Created by zouyao on 2017/3/6.
 */
var indexCtrl = m.controller("indexcontroller",function ($rootScope,$scope) {

    /**
     * 新增预约初始化
     */
    $rootScope.ao_init = function () {
        $scope.prevPage = "上一页";
        $scope.nextPage = "下一页";
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.blurName = "";
        $scope.orderType = "";

        $scope.getPlaygroundInfoListOfPlayground();
    };

});
