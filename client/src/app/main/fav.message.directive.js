  let templateFav = '<a ng-hide="message.fav">{{message.fav_count}} Fav </a><a ng-show="message.fav">{{message.fav_count}} unFav </a>';

export function favMessageDirective() {

 let directive = {   
    scope:{},
    template: templateFav,
    link: linkFunc,
    controller: FavController   
  };
  return directive;
    
  function linkFunc(scope, el) {
      el.css('width','4em');
      el.css('text-align','center');
      el.bind('click', function () {         
          scope.toggleFav();
        });
       el.bind('mouseenter', function () {
           el.css('background-color', 'yellow');
        });
        el.bind('mouseleave', function () {
            el.css('background-color', 'white');
        });      
  }      
}
class FavController {
  constructor ($scope, $log) {
    'ngInject';

    this.$log = $log;
    $scope.message = $scope.$parent.message;
      
    $scope.toggleFav = function(){
        
        $scope.message.fav = !$scope.message.fav;
        if($scope.message.fav == true){
            $scope.message.fav_count += 1;            
            $scope.$parent.main.postFav($scope.message);       
        }else{
            $scope.message.fav_count -= 1;            
            $scope.$parent.main.postRmFav($scope.message);       
        }        
        $scope.$parent.$apply();
        $log.info("fav clicked");
        
    }
  }
}   