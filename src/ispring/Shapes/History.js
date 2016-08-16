goog.provide("ispring.shapes.History");


goog.require("ispring.shapes.HistoryCommand");
// goog.require("goog.math");
goog.require("goog.array");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.History = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._commands = [];

            /**@private {number}*/
            this._current = 0;

            
        },

        /**
         * @public
         * @param model
         */
        saveStep:function(model)
        {
            var newCommand = new ispring.shapes.HistoryCommand();
            if (this._current < this._commands.length - 1)
            {
                this._commands.splice(this._current);
            }
            newCommand.execute(model);
            goog.array.insert(this._commands, newCommand);
            ++this._current;
            console.log("this._commands.length = " + this._commands.length);
            console.log("save step");
        },

        /**
         * @public
         */
        undo:function()
        {
            if (this._current > 0)
            {
                this._commands[--this._current].unExecute();
                console.log("undo");
                // document.dispatchEvent(this._changeEventRedraw);
            }
        },

        /**
         * @public
         */
        redo:function()
        {
            if (this._current < this._commands.length)
            {
                this._commands[++this._current].unExecute();
                console.log("redo");
                // document.dispatchEvent(this._changeEventRedraw);
            }
        },

        readHistory:function()
        {
            console.log("|****************************************|");
            console.log("this._commands.length = " + this._commands.length);

            for(var i = 0; i != this._commands.length; ++i)
            {
                this._commands[i].getData();
            }
            console.log("|****************************************|");
        }
    })
});


