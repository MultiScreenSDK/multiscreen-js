"use strict";
var _ = require('lodash');

module.exports = function(handlebars){
    handlebars.registerHelper("fixClass", function(){

        var entries = this;

        for(var i=0; i<entries.length; i++){
            var entry = entries[i];
            if(entry.kind === "class"){
                var cIndex = _.findIndex(entries, {kind:'constructor',name:entry.name});
                if(cIndex > -1){
                    var c = entries[cIndex];
                    entry.description = c.description;
                    delete c.description;

                    var tags = _.pluck(entry.customTags, 'tag');
                    if(tags.indexOf('hide-constructor') > -1){
                        entries.splice(cIndex, 1);
                    }

                    delete entry.customTags;
                }
            }
        }
    });

};