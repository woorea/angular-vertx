export function highlightMessageDirective( $compile ) {

  return {
    scope: { },
    link: function(scope, el, attr) {             
        var onlyRunOne = scope.$watch(
            function(scope) {               
              return scope.$eval(attr.compile);
            },
            function(value) {              
                var content = el.text();
                var pattern = new RegExp(/[~`\^\[\]\\/{}|\\<>]/);
                if(pattern.test(content)){
                    el.html("");
                    el.append("<hljs no-scape>"+content+"</hljs>");                  
                    $compile(el.contents())(scope);                  
                }
                // Angular un-watch 
                onlyRunOne();
            });
    }
  };
}