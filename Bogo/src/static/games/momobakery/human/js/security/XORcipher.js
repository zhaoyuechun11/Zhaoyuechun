(function () {

    var XORcipher = function () {
        return new XORcipher.fn.init();
    };


    XORcipher.fn = XORcipher.prototype =
    {
        constructor: XORcipher,
        init:function()
        {

            return this;
        },

        //암호화
        xorEncoder:function($str, $key)
        {
            var bytes = [];
            for (var i = 0; i < $str.length; ++i)
            {
                bytes.push($str.charCodeAt(i));
            }

            var result = [];
            for(var i = 0; i < bytes.length; i++)
            {
                result.push(bytes[i] ^ $key);
            }
            return result;
        },

        //복호화
        xorDecoder:function($byte, $key)
        {
            var bytes = [];
            for(var i = 0; i < $byte.length; i++)
            {
                bytes.push($byte[i] ^ $key);
            }

            var str = String.fromCharCode.apply(String, bytes);
            return str;
        }
    };

    window.XORcipher = XORcipher;
}());

XORcipher.fn.init.prototype = XORcipher.fn;