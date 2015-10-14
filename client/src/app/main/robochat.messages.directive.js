export function roboChatMessagesDirective() {

  return {
    restrict: 'A',
    scope: {
      messages: '='
    },
    link: function(scope, el, attr) {

      scope.$applyAsync(() => {
        el[0].scrollTop = el[0].scrollHeight;
      })
      
      scope.$watch('messages.length', (after, before) => {
        if(after != before) {
          el[0].scrollTop = el[0].scrollHeight;
        }
      })

    }
  };

}
