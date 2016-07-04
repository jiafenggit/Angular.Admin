define(['app', 'angular', 'angular-cookies'], function (app, angular) {

    app.useModule('ngCookies');

    app.controller('app.menu', function ($rootScope, $scope, $cookies, appMenuSetProvider) {

        // 初始左侧菜单的模式
        var layoutMainClass = $cookies.get('layout-main-class');
        layoutMainClass && ($rootScope.app.layout.class.main = layoutMainClass);
        // 切换左侧菜单的模式
        $rootScope.toggleLeftNav = function () {
            console.log('toggleLeftNav');
            var menuClass = $rootScope.app.layout.class.main;
            if (menuClass.indexOf(' framework-sidebar-full') !== -1) {
                $rootScope.app.layout.class.main = menuClass.replace(' framework-sidebar-full', ' framework-sidebar-mini');
            } else {
                $rootScope.app.layout.class.main = menuClass.replace(' framework-sidebar-mini', ' framework-sidebar-full');
            }
            $cookies.put('layout-main-class', $rootScope.app.layout.class.main);
        };
        $scope.toggleLeftItemNav = function (menu) {
            console.log('toggleLeftItemNav : ' + menu.name);
            $cookies.put('menu-open-' + menu.node, menu.open = !menu.open);
        };

        $scope.openMenu = function (menu) {
            console.log('openMenu : ' + menu.name);
            //去除所有菜单的选择
            appMenuSetProvider.clearMenuStat($rootScope.app.menudata, 0, 'active');
            //记录当前点击菜单的选择
            $cookies.put('menu-active-' + menu.node, menu.active = true);
            $rootScope.$location.spm = menu.node;
        };
    });

});