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
                var codeParts = content.split("```").filter(function(el) {return el.length != 0});
                var startCode = (content.indexOf("```")==0)
                if(codeParts.length>1 || startCode){
                    el.html("");
                    
                    codeParts.forEach(function(part, it){
                        if(startCode != (it%2)){
                          console.log("is Code");
                            el.append("<hljs no-scape>"+part+"</hljs>");    
                        }else{
                            el.append(part);
                        } 
                        console.log(it, part);
                    });                    
                     $compile(el.contents())(scope);                  
                }
                // Angular un-watch 
                onlyRunOne();
            });
    }
  };
}