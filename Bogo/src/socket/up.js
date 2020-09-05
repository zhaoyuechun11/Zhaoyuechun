/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.up = (function() {

    var up = {};

    up.handshake_type_enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "suggest_upgrade"] = 1;
        values[valuesById[2] = "required_upgrade"] = 2;
        values[valuesById[3] = "server_maintain"] = 3;
        values[valuesById[4] = "server_restart"] = 4;
        return values;
    })();

    up.login_type_enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "default_login"] = 1;
        values[valuesById[2] = "facebook_login"] = 2;
        values[valuesById[3] = "guest_login"] = 3;
        values[valuesById[4] = "token_login"] = 4;
        values[valuesById[5] = "mobile_login"] = 5;
        values[valuesById[6] = "google_login"] = 6;
        return values;
    })();

    up.logout_reason_enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "normal_logout"] = 1;
        values[valuesById[2] = "switch_user"] = 2;
        values[valuesById[22] = "relogin"] = 22;
        values[valuesById[20] = "break_line"] = 20;
        values[valuesById[21] = "for_error"] = 21;
        values[valuesById[23] = "timeout_logout"] = 23;
        values[valuesById[24] = "kick"] = 24;
        return values;
    })();

    up.result_enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "error_code_success"] = 0;
        values[valuesById[90002] = "error_code_none"] = 90002;
        values[valuesById[90003] = "error_code_fail"] = 90003;
        values[valuesById[90004] = "error_code_invalid_req"] = 90004;
        values[valuesById[90005] = "error_code_user_inexistent"] = 90005;
        values[valuesById[90006] = "error_code_diamond_not_enough"] = 90006;
        values[valuesById[90007] = "error_code_db_fail"] = 90007;
        values[valuesById[90008] = "error_code_service_inexistent"] = 90008;
        values[valuesById[90009] = "error_code_game_not_begin"] = 90009;
        values[valuesById[90010] = "error_code_game_is_over"] = 90010;
        values[valuesById[90011] = "error_code_service_busy"] = 90011;
        values[valuesById[90012] = "error_code_param_error"] = 90012;
        values[valuesById[90013] = "error_code_not_join_game"] = 90013;
        values[valuesById[90014] = "error_code_allow_in_one_room_limit"] = 90014;
        values[valuesById[90015] = "error_code_playing_unable_leave_room"] = 90015;
        values[valuesById[90016] = "error_code_alread_playing"] = 90016;
        values[valuesById[90017] = "error_code_need_login_first"] = 90017;
        values[valuesById[90018] = "error_code_player_count_not_enough"] = 90018;
        values[valuesById[90019] = "error_code_can_not_join_game"] = 90019;
        values[valuesById[90020] = "error_code_alread_sit_down"] = 90020;
        values[valuesById[90021] = "error_code_gold_is_not_enough"] = 90021;
        values[valuesById[90022] = "error_code_user_not_init"] = 90022;
        values[valuesById[90024] = "error_code_send_expression_to_myself"] = 90024;
        values[valuesById[90025] = "error_code_obj_already_existent"] = 90025;
        values[valuesById[90026] = "error_code_user_in_black_list"] = 90026;
        values[valuesById[90027] = "error_code_new_account_already_binding"] = 90027;
        values[valuesById[90028] = "error_code_user_alread_join_other_game"] = 90028;
        values[valuesById[90029] = "error_code_timeout"] = 90029;
        return values;
    })();

    up.result = (function() {

        function result(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        result.prototype._err_no = 0;
        result.prototype._err_desc = "";

        result.create = function create(properties) {
            return new result(properties);
        };

        result.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).int32(message._err_no);
            if (message._err_desc != null && message.hasOwnProperty("_err_desc"))
                writer.uint32(18).string(message._err_desc);
            return writer;
        };

        result.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        result.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.result();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._err_no = reader.int32();
                    break;
                case 2:
                    message._err_desc = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_err_no"))
                throw $util.ProtocolError("missing required '_err_no'", { instance: message });
            return message;
        };

        result.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        result.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message._err_no) {
            default:
                return "_err_no: enum value expected";
            case 0:
            case 90002:
            case 90003:
            case 90004:
            case 90005:
            case 90006:
            case 90007:
            case 90008:
            case 90009:
            case 90010:
            case 90011:
            case 90012:
            case 90013:
            case 90014:
            case 90015:
            case 90016:
            case 90017:
            case 90018:
            case 90019:
            case 90020:
            case 90021:
            case 90022:
            case 90024:
            case 90025:
            case 90026:
            case 90027:
            case 90028:
            case 90029:
                break;
            }
            if (message._err_desc != null && message.hasOwnProperty("_err_desc"))
                if (!$util.isString(message._err_desc))
                    return "_err_desc: string expected";
            return null;
        };

        result.fromObject = function fromObject(object) {
            if (object instanceof $root.up.result)
                return object;
            var message = new $root.up.result();
            switch (object._err_no) {
            case "error_code_success":
            case 0:
                message._err_no = 0;
                break;
            case "error_code_none":
            case 90002:
                message._err_no = 90002;
                break;
            case "error_code_fail":
            case 90003:
                message._err_no = 90003;
                break;
            case "error_code_invalid_req":
            case 90004:
                message._err_no = 90004;
                break;
            case "error_code_user_inexistent":
            case 90005:
                message._err_no = 90005;
                break;
            case "error_code_diamond_not_enough":
            case 90006:
                message._err_no = 90006;
                break;
            case "error_code_db_fail":
            case 90007:
                message._err_no = 90007;
                break;
            case "error_code_service_inexistent":
            case 90008:
                message._err_no = 90008;
                break;
            case "error_code_game_not_begin":
            case 90009:
                message._err_no = 90009;
                break;
            case "error_code_game_is_over":
            case 90010:
                message._err_no = 90010;
                break;
            case "error_code_service_busy":
            case 90011:
                message._err_no = 90011;
                break;
            case "error_code_param_error":
            case 90012:
                message._err_no = 90012;
                break;
            case "error_code_not_join_game":
            case 90013:
                message._err_no = 90013;
                break;
            case "error_code_allow_in_one_room_limit":
            case 90014:
                message._err_no = 90014;
                break;
            case "error_code_playing_unable_leave_room":
            case 90015:
                message._err_no = 90015;
                break;
            case "error_code_alread_playing":
            case 90016:
                message._err_no = 90016;
                break;
            case "error_code_need_login_first":
            case 90017:
                message._err_no = 90017;
                break;
            case "error_code_player_count_not_enough":
            case 90018:
                message._err_no = 90018;
                break;
            case "error_code_can_not_join_game":
            case 90019:
                message._err_no = 90019;
                break;
            case "error_code_alread_sit_down":
            case 90020:
                message._err_no = 90020;
                break;
            case "error_code_gold_is_not_enough":
            case 90021:
                message._err_no = 90021;
                break;
            case "error_code_user_not_init":
            case 90022:
                message._err_no = 90022;
                break;
            case "error_code_send_expression_to_myself":
            case 90024:
                message._err_no = 90024;
                break;
            case "error_code_obj_already_existent":
            case 90025:
                message._err_no = 90025;
                break;
            case "error_code_user_in_black_list":
            case 90026:
                message._err_no = 90026;
                break;
            case "error_code_new_account_already_binding":
            case 90027:
                message._err_no = 90027;
                break;
            case "error_code_user_alread_join_other_game":
            case 90028:
                message._err_no = 90028;
                break;
            case "error_code_timeout":
            case 90029:
                message._err_no = 90029;
                break;
            }
            if (object._err_desc != null)
                message._err_desc = String(object._err_desc);
            return message;
        };

        result.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._err_no = options.enums === String ? "error_code_success" : 0;
                object._err_desc = "";
            }
            if (message._err_no != null && message.hasOwnProperty("_err_no"))
                object._err_no = options.enums === String ? $root.up.result_enum[message._err_no] : message._err_no;
            if (message._err_desc != null && message.hasOwnProperty("_err_desc"))
                object._err_desc = message._err_desc;
            return object;
        };

        result.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return result;
    })();

    up.user_base_info_struct = (function() {

        function user_base_info_struct(properties) {
            this._live_img_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        user_base_info_struct.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        user_base_info_struct.prototype._user_name = "";
        user_base_info_struct.prototype._birthday = "";
        user_base_info_struct.prototype._head_portrait = "";
        user_base_info_struct.prototype._sex = 0;
        user_base_info_struct.prototype._job = "";
        user_base_info_struct.prototype._homeland = "";
        user_base_info_struct.prototype._constellation = "";
        user_base_info_struct.prototype._signature = "";
        user_base_info_struct.prototype._is_robot = 0;
        user_base_info_struct.prototype._live_img_list = $util.emptyArray;

        user_base_info_struct.create = function create(properties) {
            return new user_base_info_struct(properties);
        };

        user_base_info_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._uid != null && message.hasOwnProperty("_uid"))
                writer.uint32(8).uint64(message._uid);
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                writer.uint32(18).string(message._user_name);
            if (message._birthday != null && message.hasOwnProperty("_birthday"))
                writer.uint32(26).string(message._birthday);
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                writer.uint32(34).string(message._head_portrait);
            if (message._sex != null && message.hasOwnProperty("_sex"))
                writer.uint32(40).uint32(message._sex);
            if (message._job != null && message.hasOwnProperty("_job"))
                writer.uint32(50).string(message._job);
            if (message._homeland != null && message.hasOwnProperty("_homeland"))
                writer.uint32(58).string(message._homeland);
            if (message._constellation != null && message.hasOwnProperty("_constellation"))
                writer.uint32(66).string(message._constellation);
            if (message._signature != null && message.hasOwnProperty("_signature"))
                writer.uint32(74).string(message._signature);
            if (message._is_robot != null && message.hasOwnProperty("_is_robot"))
                writer.uint32(80).uint32(message._is_robot);
            if (message._live_img_list != null && message._live_img_list.length)
                for (var i = 0; i < message._live_img_list.length; ++i)
                    writer.uint32(90).string(message._live_img_list[i]);
            return writer;
        };

        user_base_info_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        user_base_info_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.user_base_info_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._user_name = reader.string();
                    break;
                case 3:
                    message._birthday = reader.string();
                    break;
                case 4:
                    message._head_portrait = reader.string();
                    break;
                case 5:
                    message._sex = reader.uint32();
                    break;
                case 6:
                    message._job = reader.string();
                    break;
                case 7:
                    message._homeland = reader.string();
                    break;
                case 8:
                    message._constellation = reader.string();
                    break;
                case 9:
                    message._signature = reader.string();
                    break;
                case 10:
                    message._is_robot = reader.uint32();
                    break;
                case 11:
                    if (!(message._live_img_list && message._live_img_list.length))
                        message._live_img_list = [];
                    message._live_img_list.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        user_base_info_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        user_base_info_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                    return "_uid: integer|Long expected";
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                if (!$util.isString(message._user_name))
                    return "_user_name: string expected";
            if (message._birthday != null && message.hasOwnProperty("_birthday"))
                if (!$util.isString(message._birthday))
                    return "_birthday: string expected";
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                if (!$util.isString(message._head_portrait))
                    return "_head_portrait: string expected";
            if (message._sex != null && message.hasOwnProperty("_sex"))
                if (!$util.isInteger(message._sex))
                    return "_sex: integer expected";
            if (message._job != null && message.hasOwnProperty("_job"))
                if (!$util.isString(message._job))
                    return "_job: string expected";
            if (message._homeland != null && message.hasOwnProperty("_homeland"))
                if (!$util.isString(message._homeland))
                    return "_homeland: string expected";
            if (message._constellation != null && message.hasOwnProperty("_constellation"))
                if (!$util.isString(message._constellation))
                    return "_constellation: string expected";
            if (message._signature != null && message.hasOwnProperty("_signature"))
                if (!$util.isString(message._signature))
                    return "_signature: string expected";
            if (message._is_robot != null && message.hasOwnProperty("_is_robot"))
                if (!$util.isInteger(message._is_robot))
                    return "_is_robot: integer expected";
            if (message._live_img_list != null && message.hasOwnProperty("_live_img_list")) {
                if (!Array.isArray(message._live_img_list))
                    return "_live_img_list: array expected";
                for (var i = 0; i < message._live_img_list.length; ++i)
                    if (!$util.isString(message._live_img_list[i]))
                        return "_live_img_list: string[] expected";
            }
            return null;
        };

        user_base_info_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.user_base_info_struct)
                return object;
            var message = new $root.up.user_base_info_struct();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._user_name != null)
                message._user_name = String(object._user_name);
            if (object._birthday != null)
                message._birthday = String(object._birthday);
            if (object._head_portrait != null)
                message._head_portrait = String(object._head_portrait);
            if (object._sex != null)
                message._sex = object._sex >>> 0;
            if (object._job != null)
                message._job = String(object._job);
            if (object._homeland != null)
                message._homeland = String(object._homeland);
            if (object._constellation != null)
                message._constellation = String(object._constellation);
            if (object._signature != null)
                message._signature = String(object._signature);
            if (object._is_robot != null)
                message._is_robot = object._is_robot >>> 0;
            if (object._live_img_list) {
                if (!Array.isArray(object._live_img_list))
                    throw TypeError(".up.user_base_info_struct._live_img_list: array expected");
                message._live_img_list = [];
                for (var i = 0; i < object._live_img_list.length; ++i)
                    message._live_img_list[i] = String(object._live_img_list[i]);
            }
            return message;
        };

        user_base_info_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object._live_img_list = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._user_name = "";
                object._birthday = "";
                object._head_portrait = "";
                object._sex = 0;
                object._job = "";
                object._homeland = "";
                object._constellation = "";
                object._signature = "";
                object._is_robot = 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                object._user_name = message._user_name;
            if (message._birthday != null && message.hasOwnProperty("_birthday"))
                object._birthday = message._birthday;
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                object._head_portrait = message._head_portrait;
            if (message._sex != null && message.hasOwnProperty("_sex"))
                object._sex = message._sex;
            if (message._job != null && message.hasOwnProperty("_job"))
                object._job = message._job;
            if (message._homeland != null && message.hasOwnProperty("_homeland"))
                object._homeland = message._homeland;
            if (message._constellation != null && message.hasOwnProperty("_constellation"))
                object._constellation = message._constellation;
            if (message._signature != null && message.hasOwnProperty("_signature"))
                object._signature = message._signature;
            if (message._is_robot != null && message.hasOwnProperty("_is_robot"))
                object._is_robot = message._is_robot;
            if (message._live_img_list && message._live_img_list.length) {
                object._live_img_list = [];
                for (var j = 0; j < message._live_img_list.length; ++j)
                    object._live_img_list[j] = message._live_img_list[j];
            }
            return object;
        };

        user_base_info_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return user_base_info_struct;
    })();

    up.user_info_struct = (function() {

        function user_info_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        user_info_struct.prototype._user_base_info = null;
        user_info_struct.prototype._total_like = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        user_info_struct.prototype._total_belike = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        user_info_struct.prototype._total_integral = 0;
        user_info_struct.prototype._head_portrait_frame = "";
        user_info_struct.prototype._diamond = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        user_info_struct.prototype._gold = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        user_info_struct.prototype._is_trusteeship = false;
        user_info_struct.prototype._other_info = "";

        user_info_struct.create = function create(properties) {
            return new user_info_struct(properties);
        };

        user_info_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.up.user_base_info_struct.encode(message._user_base_info, writer.uint32(10).fork()).ldelim();
            if (message._total_like != null && message.hasOwnProperty("_total_like"))
                writer.uint32(16).uint64(message._total_like);
            if (message._total_belike != null && message.hasOwnProperty("_total_belike"))
                writer.uint32(24).uint64(message._total_belike);
            if (message._total_integral != null && message.hasOwnProperty("_total_integral"))
                writer.uint32(32).int32(message._total_integral);
            if (message._head_portrait_frame != null && message.hasOwnProperty("_head_portrait_frame"))
                writer.uint32(42).string(message._head_portrait_frame);
            if (message._diamond != null && message.hasOwnProperty("_diamond"))
                writer.uint32(48).uint64(message._diamond);
            if (message._gold != null && message.hasOwnProperty("_gold"))
                writer.uint32(56).uint64(message._gold);
            if (message._is_trusteeship != null && message.hasOwnProperty("_is_trusteeship"))
                writer.uint32(64).bool(message._is_trusteeship);
            if (message._other_info != null && message.hasOwnProperty("_other_info"))
                writer.uint32(794).string(message._other_info);
            return writer;
        };

        user_info_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        user_info_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.user_info_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._user_base_info = $root.up.user_base_info_struct.decode(reader, reader.uint32());
                    break;
                case 2:
                    message._total_like = reader.uint64();
                    break;
                case 3:
                    message._total_belike = reader.uint64();
                    break;
                case 4:
                    message._total_integral = reader.int32();
                    break;
                case 5:
                    message._head_portrait_frame = reader.string();
                    break;
                case 6:
                    message._diamond = reader.uint64();
                    break;
                case 7:
                    message._gold = reader.uint64();
                    break;
                case 8:
                    message._is_trusteeship = reader.bool();
                    break;
                case 99:
                    message._other_info = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_user_base_info"))
                throw $util.ProtocolError("missing required '_user_base_info'", { instance: message });
            return message;
        };

        user_info_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        user_info_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.up.user_base_info_struct.verify(message._user_base_info);
                if (error)
                    return "_user_base_info." + error;
            }
            if (message._total_like != null && message.hasOwnProperty("_total_like"))
                if (!$util.isInteger(message._total_like) && !(message._total_like && $util.isInteger(message._total_like.low) && $util.isInteger(message._total_like.high)))
                    return "_total_like: integer|Long expected";
            if (message._total_belike != null && message.hasOwnProperty("_total_belike"))
                if (!$util.isInteger(message._total_belike) && !(message._total_belike && $util.isInteger(message._total_belike.low) && $util.isInteger(message._total_belike.high)))
                    return "_total_belike: integer|Long expected";
            if (message._total_integral != null && message.hasOwnProperty("_total_integral"))
                if (!$util.isInteger(message._total_integral))
                    return "_total_integral: integer expected";
            if (message._head_portrait_frame != null && message.hasOwnProperty("_head_portrait_frame"))
                if (!$util.isString(message._head_portrait_frame))
                    return "_head_portrait_frame: string expected";
            if (message._diamond != null && message.hasOwnProperty("_diamond"))
                if (!$util.isInteger(message._diamond) && !(message._diamond && $util.isInteger(message._diamond.low) && $util.isInteger(message._diamond.high)))
                    return "_diamond: integer|Long expected";
            if (message._gold != null && message.hasOwnProperty("_gold"))
                if (!$util.isInteger(message._gold) && !(message._gold && $util.isInteger(message._gold.low) && $util.isInteger(message._gold.high)))
                    return "_gold: integer|Long expected";
            if (message._is_trusteeship != null && message.hasOwnProperty("_is_trusteeship"))
                if (typeof message._is_trusteeship !== "boolean")
                    return "_is_trusteeship: boolean expected";
            if (message._other_info != null && message.hasOwnProperty("_other_info"))
                if (!$util.isString(message._other_info))
                    return "_other_info: string expected";
            return null;
        };

        user_info_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.user_info_struct)
                return object;
            var message = new $root.up.user_info_struct();
            if (object._user_base_info != null) {
                if (typeof object._user_base_info !== "object")
                    throw TypeError(".up.user_info_struct._user_base_info: object expected");
                message._user_base_info = $root.up.user_base_info_struct.fromObject(object._user_base_info);
            }
            if (object._total_like != null)
                if ($util.Long)
                    (message._total_like = $util.Long.fromValue(object._total_like)).unsigned = true;
                else if (typeof object._total_like === "string")
                    message._total_like = parseInt(object._total_like, 10);
                else if (typeof object._total_like === "number")
                    message._total_like = object._total_like;
                else if (typeof object._total_like === "object")
                    message._total_like = new $util.LongBits(object._total_like.low >>> 0, object._total_like.high >>> 0).toNumber(true);
            if (object._total_belike != null)
                if ($util.Long)
                    (message._total_belike = $util.Long.fromValue(object._total_belike)).unsigned = true;
                else if (typeof object._total_belike === "string")
                    message._total_belike = parseInt(object._total_belike, 10);
                else if (typeof object._total_belike === "number")
                    message._total_belike = object._total_belike;
                else if (typeof object._total_belike === "object")
                    message._total_belike = new $util.LongBits(object._total_belike.low >>> 0, object._total_belike.high >>> 0).toNumber(true);
            if (object._total_integral != null)
                message._total_integral = object._total_integral | 0;
            if (object._head_portrait_frame != null)
                message._head_portrait_frame = String(object._head_portrait_frame);
            if (object._diamond != null)
                if ($util.Long)
                    (message._diamond = $util.Long.fromValue(object._diamond)).unsigned = true;
                else if (typeof object._diamond === "string")
                    message._diamond = parseInt(object._diamond, 10);
                else if (typeof object._diamond === "number")
                    message._diamond = object._diamond;
                else if (typeof object._diamond === "object")
                    message._diamond = new $util.LongBits(object._diamond.low >>> 0, object._diamond.high >>> 0).toNumber(true);
            if (object._gold != null)
                if ($util.Long)
                    (message._gold = $util.Long.fromValue(object._gold)).unsigned = true;
                else if (typeof object._gold === "string")
                    message._gold = parseInt(object._gold, 10);
                else if (typeof object._gold === "number")
                    message._gold = object._gold;
                else if (typeof object._gold === "object")
                    message._gold = new $util.LongBits(object._gold.low >>> 0, object._gold.high >>> 0).toNumber(true);
            if (object._is_trusteeship != null)
                message._is_trusteeship = Boolean(object._is_trusteeship);
            if (object._other_info != null)
                message._other_info = String(object._other_info);
            return message;
        };

        user_info_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._user_base_info = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._total_like = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._total_like = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._total_belike = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._total_belike = options.longs === String ? "0" : 0;
                object._total_integral = 0;
                object._head_portrait_frame = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._diamond = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._diamond = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._gold = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._gold = options.longs === String ? "0" : 0;
                object._is_trusteeship = false;
                object._other_info = "";
            }
            if (message._user_base_info != null && message.hasOwnProperty("_user_base_info"))
                object._user_base_info = $root.up.user_base_info_struct.toObject(message._user_base_info, options);
            if (message._total_like != null && message.hasOwnProperty("_total_like"))
                if (typeof message._total_like === "number")
                    object._total_like = options.longs === String ? String(message._total_like) : message._total_like;
                else
                    object._total_like = options.longs === String ? $util.Long.prototype.toString.call(message._total_like) : options.longs === Number ? new $util.LongBits(message._total_like.low >>> 0, message._total_like.high >>> 0).toNumber(true) : message._total_like;
            if (message._total_belike != null && message.hasOwnProperty("_total_belike"))
                if (typeof message._total_belike === "number")
                    object._total_belike = options.longs === String ? String(message._total_belike) : message._total_belike;
                else
                    object._total_belike = options.longs === String ? $util.Long.prototype.toString.call(message._total_belike) : options.longs === Number ? new $util.LongBits(message._total_belike.low >>> 0, message._total_belike.high >>> 0).toNumber(true) : message._total_belike;
            if (message._total_integral != null && message.hasOwnProperty("_total_integral"))
                object._total_integral = message._total_integral;
            if (message._head_portrait_frame != null && message.hasOwnProperty("_head_portrait_frame"))
                object._head_portrait_frame = message._head_portrait_frame;
            if (message._diamond != null && message.hasOwnProperty("_diamond"))
                if (typeof message._diamond === "number")
                    object._diamond = options.longs === String ? String(message._diamond) : message._diamond;
                else
                    object._diamond = options.longs === String ? $util.Long.prototype.toString.call(message._diamond) : options.longs === Number ? new $util.LongBits(message._diamond.low >>> 0, message._diamond.high >>> 0).toNumber(true) : message._diamond;
            if (message._gold != null && message.hasOwnProperty("_gold"))
                if (typeof message._gold === "number")
                    object._gold = options.longs === String ? String(message._gold) : message._gold;
                else
                    object._gold = options.longs === String ? $util.Long.prototype.toString.call(message._gold) : options.longs === Number ? new $util.LongBits(message._gold.low >>> 0, message._gold.high >>> 0).toNumber(true) : message._gold;
            if (message._is_trusteeship != null && message.hasOwnProperty("_is_trusteeship"))
                object._is_trusteeship = message._is_trusteeship;
            if (message._other_info != null && message.hasOwnProperty("_other_info"))
                object._other_info = message._other_info;
            return object;
        };

        user_info_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return user_info_struct;
    })();

    up.chat_channel = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "playing"] = 1;
        values[valuesById[2] = "private"] = 2;
        values[valuesById[3] = "cur_game"] = 3;
        values[valuesById[4] = "all_world"] = 4;
        values[valuesById[5] = "game_guild"] = 5;
        return values;
    })();

    up.chat_type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "chat_optional"] = 1;
        values[valuesById[2] = "chat_face"] = 2;
        values[valuesById[3] = "chat_voice"] = 3;
        values[valuesById[4] = "chat_custom"] = 4;
        return values;
    })();

    up.user_game_score = (function() {

        function user_game_score(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        user_game_score.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        user_game_score.prototype._cur_score = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        user_game_score.create = function create(properties) {
            return new user_game_score(properties);
        };

        user_game_score.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(16).uint64(message._cur_score);
            return writer;
        };

        user_game_score.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        user_game_score.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.user_game_score();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._cur_score = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_cur_score"))
                throw $util.ProtocolError("missing required '_cur_score'", { instance: message });
            return message;
        };

        user_game_score.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        user_game_score.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (!$util.isInteger(message._cur_score) && !(message._cur_score && $util.isInteger(message._cur_score.low) && $util.isInteger(message._cur_score.high)))
                return "_cur_score: integer|Long expected";
            return null;
        };

        user_game_score.fromObject = function fromObject(object) {
            if (object instanceof $root.up.user_game_score)
                return object;
            var message = new $root.up.user_game_score();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._cur_score != null)
                if ($util.Long)
                    (message._cur_score = $util.Long.fromValue(object._cur_score)).unsigned = true;
                else if (typeof object._cur_score === "string")
                    message._cur_score = parseInt(object._cur_score, 10);
                else if (typeof object._cur_score === "number")
                    message._cur_score = object._cur_score;
                else if (typeof object._cur_score === "object")
                    message._cur_score = new $util.LongBits(object._cur_score.low >>> 0, object._cur_score.high >>> 0).toNumber(true);
            return message;
        };

        user_game_score.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._cur_score = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._cur_score = options.longs === String ? "0" : 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._cur_score != null && message.hasOwnProperty("_cur_score"))
                if (typeof message._cur_score === "number")
                    object._cur_score = options.longs === String ? String(message._cur_score) : message._cur_score;
                else
                    object._cur_score = options.longs === String ? $util.Long.prototype.toString.call(message._cur_score) : options.longs === Number ? new $util.LongBits(message._cur_score.low >>> 0, message._cur_score.high >>> 0).toNumber(true) : message._cur_score;
            return object;
        };

        user_game_score.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return user_game_score;
    })();

    up.love_game_struct = (function() {

        function love_game_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        love_game_struct.prototype._gid = "";
        love_game_struct.prototype._play_times = 0;

        love_game_struct.create = function create(properties) {
            return new love_game_struct(properties);
        };

        love_game_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            writer.uint32(16).uint32(message._play_times);
            return writer;
        };

        love_game_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        love_game_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.love_game_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._play_times = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            if (!message.hasOwnProperty("_play_times"))
                throw $util.ProtocolError("missing required '_play_times'", { instance: message });
            return message;
        };

        love_game_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        love_game_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (!$util.isInteger(message._play_times))
                return "_play_times: integer expected";
            return null;
        };

        love_game_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.love_game_struct)
                return object;
            var message = new $root.up.love_game_struct();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._play_times != null)
                message._play_times = object._play_times >>> 0;
            return message;
        };

        love_game_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                object._play_times = 0;
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._play_times != null && message.hasOwnProperty("_play_times"))
                object._play_times = message._play_times;
            return object;
        };

        love_game_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return love_game_struct;
    })();

    up.gid_num_struct = (function() {

        function gid_num_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        gid_num_struct.prototype._gid = "";
        gid_num_struct.prototype._online_num = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        gid_num_struct.create = function create(properties) {
            return new gid_num_struct(properties);
        };

        gid_num_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            writer.uint32(16).uint64(message._online_num);
            return writer;
        };

        gid_num_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        gid_num_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.gid_num_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._online_num = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            if (!message.hasOwnProperty("_online_num"))
                throw $util.ProtocolError("missing required '_online_num'", { instance: message });
            return message;
        };

        gid_num_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        gid_num_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (!$util.isInteger(message._online_num) && !(message._online_num && $util.isInteger(message._online_num.low) && $util.isInteger(message._online_num.high)))
                return "_online_num: integer|Long expected";
            return null;
        };

        gid_num_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.gid_num_struct)
                return object;
            var message = new $root.up.gid_num_struct();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._online_num != null)
                if ($util.Long)
                    (message._online_num = $util.Long.fromValue(object._online_num)).unsigned = true;
                else if (typeof object._online_num === "string")
                    message._online_num = parseInt(object._online_num, 10);
                else if (typeof object._online_num === "number")
                    message._online_num = object._online_num;
                else if (typeof object._online_num === "object")
                    message._online_num = new $util.LongBits(object._online_num.low >>> 0, object._online_num.high >>> 0).toNumber(true);
            return message;
        };

        gid_num_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._online_num = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._online_num = options.longs === String ? "0" : 0;
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._online_num != null && message.hasOwnProperty("_online_num"))
                if (typeof message._online_num === "number")
                    object._online_num = options.longs === String ? String(message._online_num) : message._online_num;
                else
                    object._online_num = options.longs === String ? $util.Long.prototype.toString.call(message._online_num) : options.longs === Number ? new $util.LongBits(message._online_num.low >>> 0, message._online_num.high >>> 0).toNumber(true) : message._online_num;
            return object;
        };

        gid_num_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return gid_num_struct;
    })();

    up.simple_user_info_struct = (function() {

        function simple_user_info_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        simple_user_info_struct.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        simple_user_info_struct.prototype._user_name = "";
        simple_user_info_struct.prototype._sex = 0;
        simple_user_info_struct.prototype._head_portrait = "";
        simple_user_info_struct.prototype._head_portrait_frame = "";
        simple_user_info_struct.prototype._distance = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        simple_user_info_struct.create = function create(properties) {
            return new simple_user_info_struct(properties);
        };

        simple_user_info_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                writer.uint32(18).string(message._user_name);
            if (message._sex != null && message.hasOwnProperty("_sex"))
                writer.uint32(24).uint32(message._sex);
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                writer.uint32(34).string(message._head_portrait);
            if (message._head_portrait_frame != null && message.hasOwnProperty("_head_portrait_frame"))
                writer.uint32(42).string(message._head_portrait_frame);
            if (message._distance != null && message.hasOwnProperty("_distance"))
                writer.uint32(48).uint64(message._distance);
            return writer;
        };

        simple_user_info_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        simple_user_info_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.simple_user_info_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._user_name = reader.string();
                    break;
                case 3:
                    message._sex = reader.uint32();
                    break;
                case 4:
                    message._head_portrait = reader.string();
                    break;
                case 5:
                    message._head_portrait_frame = reader.string();
                    break;
                case 6:
                    message._distance = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        simple_user_info_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        simple_user_info_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                if (!$util.isString(message._user_name))
                    return "_user_name: string expected";
            if (message._sex != null && message.hasOwnProperty("_sex"))
                if (!$util.isInteger(message._sex))
                    return "_sex: integer expected";
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                if (!$util.isString(message._head_portrait))
                    return "_head_portrait: string expected";
            if (message._head_portrait_frame != null && message.hasOwnProperty("_head_portrait_frame"))
                if (!$util.isString(message._head_portrait_frame))
                    return "_head_portrait_frame: string expected";
            if (message._distance != null && message.hasOwnProperty("_distance"))
                if (!$util.isInteger(message._distance) && !(message._distance && $util.isInteger(message._distance.low) && $util.isInteger(message._distance.high)))
                    return "_distance: integer|Long expected";
            return null;
        };

        simple_user_info_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.simple_user_info_struct)
                return object;
            var message = new $root.up.simple_user_info_struct();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._user_name != null)
                message._user_name = String(object._user_name);
            if (object._sex != null)
                message._sex = object._sex >>> 0;
            if (object._head_portrait != null)
                message._head_portrait = String(object._head_portrait);
            if (object._head_portrait_frame != null)
                message._head_portrait_frame = String(object._head_portrait_frame);
            if (object._distance != null)
                if ($util.Long)
                    (message._distance = $util.Long.fromValue(object._distance)).unsigned = true;
                else if (typeof object._distance === "string")
                    message._distance = parseInt(object._distance, 10);
                else if (typeof object._distance === "number")
                    message._distance = object._distance;
                else if (typeof object._distance === "object")
                    message._distance = new $util.LongBits(object._distance.low >>> 0, object._distance.high >>> 0).toNumber(true);
            return message;
        };

        simple_user_info_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._user_name = "";
                object._sex = 0;
                object._head_portrait = "";
                object._head_portrait_frame = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._distance = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._distance = options.longs === String ? "0" : 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                object._user_name = message._user_name;
            if (message._sex != null && message.hasOwnProperty("_sex"))
                object._sex = message._sex;
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                object._head_portrait = message._head_portrait;
            if (message._head_portrait_frame != null && message.hasOwnProperty("_head_portrait_frame"))
                object._head_portrait_frame = message._head_portrait_frame;
            if (message._distance != null && message.hasOwnProperty("_distance"))
                if (typeof message._distance === "number")
                    object._distance = options.longs === String ? String(message._distance) : message._distance;
                else
                    object._distance = options.longs === String ? $util.Long.prototype.toString.call(message._distance) : options.longs === Number ? new $util.LongBits(message._distance.low >>> 0, message._distance.high >>> 0).toNumber(true) : message._distance;
            return object;
        };

        simple_user_info_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return simple_user_info_struct;
    })();

    up.offline_data_type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "all"] = 1;
        values[valuesById[2] = "chat"] = 2;
        values[valuesById[3] = "add_friend"] = 3;
        values[valuesById[4] = "agree_add_friend"] = 4;
        values[valuesById[5] = "invite_game"] = 5;
        values[valuesById[6] = "cancel_invite_game"] = 6;
        values[valuesById[7] = "like"] = 7;
        return values;
    })();

    up.feedback_type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "login"] = 1;
        values[valuesById[2] = "game"] = 2;
        values[valuesById[3] = "personal_data"] = 3;
        values[valuesById[4] = "chat_frame"] = 4;
        values[valuesById[5] = "other_question_or_suggestion"] = 5;
        values[valuesById[6] = "report_or_complaint"] = 6;
        return values;
    })();

    up.black_list_struct = (function() {

        function black_list_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        black_list_struct.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        black_list_struct.prototype._time = "";

        black_list_struct.create = function create(properties) {
            return new black_list_struct(properties);
        };

        black_list_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(18).string(message._time);
            return writer;
        };

        black_list_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        black_list_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.black_list_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._time = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_time"))
                throw $util.ProtocolError("missing required '_time'", { instance: message });
            return message;
        };

        black_list_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        black_list_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (!$util.isString(message._time))
                return "_time: string expected";
            return null;
        };

        black_list_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.black_list_struct)
                return object;
            var message = new $root.up.black_list_struct();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._time != null)
                message._time = String(object._time);
            return message;
        };

        black_list_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._time = "";
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._time != null && message.hasOwnProperty("_time"))
                object._time = message._time;
            return object;
        };

        black_list_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return black_list_struct;
    })();

    up.rank_struct = (function() {

        function rank_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        rank_struct.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        rank_struct.prototype._score = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        rank_struct.prototype._level = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        rank_struct.create = function create(properties) {
            return new rank_struct(properties);
        };

        rank_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            if (message._score != null && message.hasOwnProperty("_score"))
                writer.uint32(16).uint64(message._score);
            if (message._level != null && message.hasOwnProperty("_level"))
                writer.uint32(24).uint64(message._level);
            return writer;
        };

        rank_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        rank_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.rank_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._score = reader.uint64();
                    break;
                case 3:
                    message._level = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        rank_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        rank_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (message._score != null && message.hasOwnProperty("_score"))
                if (!$util.isInteger(message._score) && !(message._score && $util.isInteger(message._score.low) && $util.isInteger(message._score.high)))
                    return "_score: integer|Long expected";
            if (message._level != null && message.hasOwnProperty("_level"))
                if (!$util.isInteger(message._level) && !(message._level && $util.isInteger(message._level.low) && $util.isInteger(message._level.high)))
                    return "_level: integer|Long expected";
            return null;
        };

        rank_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.rank_struct)
                return object;
            var message = new $root.up.rank_struct();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._score != null)
                if ($util.Long)
                    (message._score = $util.Long.fromValue(object._score)).unsigned = true;
                else if (typeof object._score === "string")
                    message._score = parseInt(object._score, 10);
                else if (typeof object._score === "number")
                    message._score = object._score;
                else if (typeof object._score === "object")
                    message._score = new $util.LongBits(object._score.low >>> 0, object._score.high >>> 0).toNumber(true);
            if (object._level != null)
                if ($util.Long)
                    (message._level = $util.Long.fromValue(object._level)).unsigned = true;
                else if (typeof object._level === "string")
                    message._level = parseInt(object._level, 10);
                else if (typeof object._level === "number")
                    message._level = object._level;
                else if (typeof object._level === "object")
                    message._level = new $util.LongBits(object._level.low >>> 0, object._level.high >>> 0).toNumber(true);
            return message;
        };

        rank_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._score = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._score = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._level = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._level = options.longs === String ? "0" : 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._score != null && message.hasOwnProperty("_score"))
                if (typeof message._score === "number")
                    object._score = options.longs === String ? String(message._score) : message._score;
                else
                    object._score = options.longs === String ? $util.Long.prototype.toString.call(message._score) : options.longs === Number ? new $util.LongBits(message._score.low >>> 0, message._score.high >>> 0).toNumber(true) : message._score;
            if (message._level != null && message.hasOwnProperty("_level"))
                if (typeof message._level === "number")
                    object._level = options.longs === String ? String(message._level) : message._level;
                else
                    object._level = options.longs === String ? $util.Long.prototype.toString.call(message._level) : options.longs === Number ? new $util.LongBits(message._level.low >>> 0, message._level.high >>> 0).toNumber(true) : message._level;
            return object;
        };

        rank_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return rank_struct;
    })();

    up.achievement_struct = (function() {

        function achievement_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        achievement_struct.prototype._achievement_name = "";
        achievement_struct.prototype._level = 0;

        achievement_struct.create = function create(properties) {
            return new achievement_struct(properties);
        };

        achievement_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._achievement_name);
            writer.uint32(16).uint32(message._level);
            return writer;
        };

        achievement_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        achievement_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.achievement_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._achievement_name = reader.string();
                    break;
                case 2:
                    message._level = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_achievement_name"))
                throw $util.ProtocolError("missing required '_achievement_name'", { instance: message });
            if (!message.hasOwnProperty("_level"))
                throw $util.ProtocolError("missing required '_level'", { instance: message });
            return message;
        };

        achievement_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        achievement_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._achievement_name))
                return "_achievement_name: string expected";
            if (!$util.isInteger(message._level))
                return "_level: integer expected";
            return null;
        };

        achievement_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.achievement_struct)
                return object;
            var message = new $root.up.achievement_struct();
            if (object._achievement_name != null)
                message._achievement_name = String(object._achievement_name);
            if (object._level != null)
                message._level = object._level >>> 0;
            return message;
        };

        achievement_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._achievement_name = "";
                object._level = 0;
            }
            if (message._achievement_name != null && message.hasOwnProperty("_achievement_name"))
                object._achievement_name = message._achievement_name;
            if (message._level != null && message.hasOwnProperty("_level"))
                object._level = message._level;
            return object;
        };

        achievement_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return achievement_struct;
    })();

    up.game_result_struct = (function() {

        function game_result_struct(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        game_result_struct.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        game_result_struct.prototype._ret = 0;
        game_result_struct.prototype._integral_num = 0;

        game_result_struct.create = function create(properties) {
            return new game_result_struct(properties);
        };

        game_result_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(16).int32(message._ret);
            if (message._integral_num != null && message.hasOwnProperty("_integral_num"))
                writer.uint32(24).int32(message._integral_num);
            return writer;
        };

        game_result_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        game_result_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.game_result_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._ret = reader.int32();
                    break;
                case 3:
                    message._integral_num = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_ret"))
                throw $util.ProtocolError("missing required '_ret'", { instance: message });
            return message;
        };

        game_result_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        game_result_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (!$util.isInteger(message._ret))
                return "_ret: integer expected";
            if (message._integral_num != null && message.hasOwnProperty("_integral_num"))
                if (!$util.isInteger(message._integral_num))
                    return "_integral_num: integer expected";
            return null;
        };

        game_result_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.game_result_struct)
                return object;
            var message = new $root.up.game_result_struct();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._ret != null)
                message._ret = object._ret | 0;
            if (object._integral_num != null)
                message._integral_num = object._integral_num | 0;
            return message;
        };

        game_result_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._ret = 0;
                object._integral_num = 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._ret != null && message.hasOwnProperty("_ret"))
                object._ret = message._ret;
            if (message._integral_num != null && message.hasOwnProperty("_integral_num"))
                object._integral_num = message._integral_num;
            return object;
        };

        game_result_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return game_result_struct;
    })();

    up.img_operate_tag = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "head_portrait_set"] = 1;
        values[valuesById[2] = "live_img_add"] = 2;
        values[valuesById[3] = "live_img_delete"] = 3;
        values[valuesById[4] = "live_img_replace"] = 4;
        values[valuesById[5] = "live_img_move"] = 5;
        return values;
    })();

    up.test_sub_struct = (function() {

        function test_sub_struct(properties) {
            this._repeated = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        test_sub_struct.prototype._required = 0;
        test_sub_struct.prototype._optional = 1;
        test_sub_struct.prototype._repeated = $util.emptyArray;

        test_sub_struct.create = function create(properties) {
            return new test_sub_struct(properties);
        };

        test_sub_struct.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint32(message._required);
            if (message._optional != null && message.hasOwnProperty("_optional"))
                writer.uint32(16).uint32(message._optional);
            if (message._repeated != null && message._repeated.length)
                for (var i = 0; i < message._repeated.length; ++i)
                    writer.uint32(24).uint32(message._repeated[i]);
            return writer;
        };

        test_sub_struct.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        test_sub_struct.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.test_sub_struct();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._required = reader.uint32();
                    break;
                case 2:
                    message._optional = reader.uint32();
                    break;
                case 3:
                    if (!(message._repeated && message._repeated.length))
                        message._repeated = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message._repeated.push(reader.uint32());
                    } else
                        message._repeated.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_required"))
                throw $util.ProtocolError("missing required '_required'", { instance: message });
            return message;
        };

        test_sub_struct.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        test_sub_struct.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._required))
                return "_required: integer expected";
            if (message._optional != null && message.hasOwnProperty("_optional"))
                if (!$util.isInteger(message._optional))
                    return "_optional: integer expected";
            if (message._repeated != null && message.hasOwnProperty("_repeated")) {
                if (!Array.isArray(message._repeated))
                    return "_repeated: array expected";
                for (var i = 0; i < message._repeated.length; ++i)
                    if (!$util.isInteger(message._repeated[i]))
                        return "_repeated: integer[] expected";
            }
            return null;
        };

        test_sub_struct.fromObject = function fromObject(object) {
            if (object instanceof $root.up.test_sub_struct)
                return object;
            var message = new $root.up.test_sub_struct();
            if (object._required != null)
                message._required = object._required >>> 0;
            if (object._optional != null)
                message._optional = object._optional >>> 0;
            if (object._repeated) {
                if (!Array.isArray(object._repeated))
                    throw TypeError(".up.test_sub_struct._repeated: array expected");
                message._repeated = [];
                for (var i = 0; i < object._repeated.length; ++i)
                    message._repeated[i] = object._repeated[i] >>> 0;
            }
            return message;
        };

        test_sub_struct.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object._repeated = [];
            if (options.defaults) {
                object._required = 0;
                object._optional = 1;
            }
            if (message._required != null && message.hasOwnProperty("_required"))
                object._required = message._required;
            if (message._optional != null && message.hasOwnProperty("_optional"))
                object._optional = message._optional;
            if (message._repeated && message._repeated.length) {
                object._repeated = [];
                for (var j = 0; j < message._repeated.length; ++j)
                    object._repeated[j] = message._repeated[j];
            }
            return object;
        };

        test_sub_struct.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return test_sub_struct;
    })();

    up.test_protobuf = (function() {

        function test_protobuf(properties) {
            this._repeated = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        test_protobuf.prototype._double = 0;
        test_protobuf.prototype._float = 0;
        test_protobuf.prototype._int32 = 0;
        test_protobuf.prototype._int64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        test_protobuf.prototype._uint32 = 0;
        test_protobuf.prototype._uint64 = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        test_protobuf.prototype._sint32 = 0;
        test_protobuf.prototype._sint64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        test_protobuf.prototype._fixed32 = 0;
        test_protobuf.prototype._fixed64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        test_protobuf.prototype._sfixed32 = 0;
        test_protobuf.prototype._sfixed64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        test_protobuf.prototype._bool = false;
        test_protobuf.prototype._string = "";
        test_protobuf.prototype._bytes = $util.newBuffer([]);
        test_protobuf.prototype._login_type_enum = 1;
        test_protobuf.prototype._required = 0;
        test_protobuf.prototype._optional = 10;
        test_protobuf.prototype._repeated = $util.emptyArray;
        test_protobuf.prototype._test_sub_struct = null;

        test_protobuf.create = function create(properties) {
            return new test_protobuf(properties);
        };

        test_protobuf.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(9).double(message._double);
            writer.uint32(21).float(message._float);
            writer.uint32(24).int32(message._int32);
            writer.uint32(32).int64(message._int64);
            writer.uint32(40).uint32(message._uint32);
            writer.uint32(48).uint64(message._uint64);
            if (message._sint32 != null && message.hasOwnProperty("_sint32"))
                writer.uint32(56).sint32(message._sint32);
            if (message._sint64 != null && message.hasOwnProperty("_sint64"))
                writer.uint32(64).sint64(message._sint64);
            if (message._fixed32 != null && message.hasOwnProperty("_fixed32"))
                writer.uint32(77).fixed32(message._fixed32);
            if (message._fixed64 != null && message.hasOwnProperty("_fixed64"))
                writer.uint32(81).fixed64(message._fixed64);
            if (message._sfixed32 != null && message.hasOwnProperty("_sfixed32"))
                writer.uint32(93).sfixed32(message._sfixed32);
            if (message._sfixed64 != null && message.hasOwnProperty("_sfixed64"))
                writer.uint32(97).sfixed64(message._sfixed64);
            if (message._bool != null && message.hasOwnProperty("_bool"))
                writer.uint32(104).bool(message._bool);
            if (message._string != null && message.hasOwnProperty("_string"))
                writer.uint32(114).string(message._string);
            if (message._bytes != null && message.hasOwnProperty("_bytes"))
                writer.uint32(122).bytes(message._bytes);
            if (message._login_type_enum != null && message.hasOwnProperty("_login_type_enum"))
                writer.uint32(128).int32(message._login_type_enum);
            if (message._required != null && message.hasOwnProperty("_required"))
                writer.uint32(136).uint32(message._required);
            if (message._optional != null && message.hasOwnProperty("_optional"))
                writer.uint32(144).uint32(message._optional);
            if (message._repeated != null && message._repeated.length)
                for (var i = 0; i < message._repeated.length; ++i)
                    writer.uint32(152).uint32(message._repeated[i]);
            if (message._test_sub_struct != null && message.hasOwnProperty("_test_sub_struct"))
                $root.up.test_sub_struct.encode(message._test_sub_struct, writer.uint32(162).fork()).ldelim();
            return writer;
        };

        test_protobuf.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        test_protobuf.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.test_protobuf();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._double = reader.double();
                    break;
                case 2:
                    message._float = reader.float();
                    break;
                case 3:
                    message._int32 = reader.int32();
                    break;
                case 4:
                    message._int64 = reader.int64();
                    break;
                case 5:
                    message._uint32 = reader.uint32();
                    break;
                case 6:
                    message._uint64 = reader.uint64();
                    break;
                case 7:
                    message._sint32 = reader.sint32();
                    break;
                case 8:
                    message._sint64 = reader.sint64();
                    break;
                case 9:
                    message._fixed32 = reader.fixed32();
                    break;
                case 10:
                    message._fixed64 = reader.fixed64();
                    break;
                case 11:
                    message._sfixed32 = reader.sfixed32();
                    break;
                case 12:
                    message._sfixed64 = reader.sfixed64();
                    break;
                case 13:
                    message._bool = reader.bool();
                    break;
                case 14:
                    message._string = reader.string();
                    break;
                case 15:
                    message._bytes = reader.bytes();
                    break;
                case 16:
                    message._login_type_enum = reader.int32();
                    break;
                case 17:
                    message._required = reader.uint32();
                    break;
                case 18:
                    message._optional = reader.uint32();
                    break;
                case 19:
                    if (!(message._repeated && message._repeated.length))
                        message._repeated = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message._repeated.push(reader.uint32());
                    } else
                        message._repeated.push(reader.uint32());
                    break;
                case 20:
                    message._test_sub_struct = $root.up.test_sub_struct.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_double"))
                throw $util.ProtocolError("missing required '_double'", { instance: message });
            if (!message.hasOwnProperty("_float"))
                throw $util.ProtocolError("missing required '_float'", { instance: message });
            if (!message.hasOwnProperty("_int32"))
                throw $util.ProtocolError("missing required '_int32'", { instance: message });
            if (!message.hasOwnProperty("_int64"))
                throw $util.ProtocolError("missing required '_int64'", { instance: message });
            if (!message.hasOwnProperty("_uint32"))
                throw $util.ProtocolError("missing required '_uint32'", { instance: message });
            if (!message.hasOwnProperty("_uint64"))
                throw $util.ProtocolError("missing required '_uint64'", { instance: message });
            return message;
        };

        test_protobuf.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        test_protobuf.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (typeof message._double !== "number")
                return "_double: number expected";
            if (typeof message._float !== "number")
                return "_float: number expected";
            if (!$util.isInteger(message._int32))
                return "_int32: integer expected";
            if (!$util.isInteger(message._int64) && !(message._int64 && $util.isInteger(message._int64.low) && $util.isInteger(message._int64.high)))
                return "_int64: integer|Long expected";
            if (!$util.isInteger(message._uint32))
                return "_uint32: integer expected";
            if (!$util.isInteger(message._uint64) && !(message._uint64 && $util.isInteger(message._uint64.low) && $util.isInteger(message._uint64.high)))
                return "_uint64: integer|Long expected";
            if (message._sint32 != null && message.hasOwnProperty("_sint32"))
                if (!$util.isInteger(message._sint32))
                    return "_sint32: integer expected";
            if (message._sint64 != null && message.hasOwnProperty("_sint64"))
                if (!$util.isInteger(message._sint64) && !(message._sint64 && $util.isInteger(message._sint64.low) && $util.isInteger(message._sint64.high)))
                    return "_sint64: integer|Long expected";
            if (message._fixed32 != null && message.hasOwnProperty("_fixed32"))
                if (!$util.isInteger(message._fixed32))
                    return "_fixed32: integer expected";
            if (message._fixed64 != null && message.hasOwnProperty("_fixed64"))
                if (!$util.isInteger(message._fixed64) && !(message._fixed64 && $util.isInteger(message._fixed64.low) && $util.isInteger(message._fixed64.high)))
                    return "_fixed64: integer|Long expected";
            if (message._sfixed32 != null && message.hasOwnProperty("_sfixed32"))
                if (!$util.isInteger(message._sfixed32))
                    return "_sfixed32: integer expected";
            if (message._sfixed64 != null && message.hasOwnProperty("_sfixed64"))
                if (!$util.isInteger(message._sfixed64) && !(message._sfixed64 && $util.isInteger(message._sfixed64.low) && $util.isInteger(message._sfixed64.high)))
                    return "_sfixed64: integer|Long expected";
            if (message._bool != null && message.hasOwnProperty("_bool"))
                if (typeof message._bool !== "boolean")
                    return "_bool: boolean expected";
            if (message._string != null && message.hasOwnProperty("_string"))
                if (!$util.isString(message._string))
                    return "_string: string expected";
            if (message._bytes != null && message.hasOwnProperty("_bytes"))
                if (!(message._bytes && typeof message._bytes.length === "number" || $util.isString(message._bytes)))
                    return "_bytes: buffer expected";
            if (message._login_type_enum != null && message.hasOwnProperty("_login_type_enum"))
                switch (message._login_type_enum) {
                default:
                    return "_login_type_enum: enum value expected";
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message._required != null && message.hasOwnProperty("_required"))
                if (!$util.isInteger(message._required))
                    return "_required: integer expected";
            if (message._optional != null && message.hasOwnProperty("_optional"))
                if (!$util.isInteger(message._optional))
                    return "_optional: integer expected";
            if (message._repeated != null && message.hasOwnProperty("_repeated")) {
                if (!Array.isArray(message._repeated))
                    return "_repeated: array expected";
                for (var i = 0; i < message._repeated.length; ++i)
                    if (!$util.isInteger(message._repeated[i]))
                        return "_repeated: integer[] expected";
            }
            if (message._test_sub_struct != null && message.hasOwnProperty("_test_sub_struct")) {
                var error = $root.up.test_sub_struct.verify(message._test_sub_struct);
                if (error)
                    return "_test_sub_struct." + error;
            }
            return null;
        };

        test_protobuf.fromObject = function fromObject(object) {
            if (object instanceof $root.up.test_protobuf)
                return object;
            var message = new $root.up.test_protobuf();
            if (object._double != null)
                message._double = Number(object._double);
            if (object._float != null)
                message._float = Number(object._float);
            if (object._int32 != null)
                message._int32 = object._int32 | 0;
            if (object._int64 != null)
                if ($util.Long)
                    (message._int64 = $util.Long.fromValue(object._int64)).unsigned = false;
                else if (typeof object._int64 === "string")
                    message._int64 = parseInt(object._int64, 10);
                else if (typeof object._int64 === "number")
                    message._int64 = object._int64;
                else if (typeof object._int64 === "object")
                    message._int64 = new $util.LongBits(object._int64.low >>> 0, object._int64.high >>> 0).toNumber();
            if (object._uint32 != null)
                message._uint32 = object._uint32 >>> 0;
            if (object._uint64 != null)
                if ($util.Long)
                    (message._uint64 = $util.Long.fromValue(object._uint64)).unsigned = true;
                else if (typeof object._uint64 === "string")
                    message._uint64 = parseInt(object._uint64, 10);
                else if (typeof object._uint64 === "number")
                    message._uint64 = object._uint64;
                else if (typeof object._uint64 === "object")
                    message._uint64 = new $util.LongBits(object._uint64.low >>> 0, object._uint64.high >>> 0).toNumber(true);
            if (object._sint32 != null)
                message._sint32 = object._sint32 | 0;
            if (object._sint64 != null)
                if ($util.Long)
                    (message._sint64 = $util.Long.fromValue(object._sint64)).unsigned = false;
                else if (typeof object._sint64 === "string")
                    message._sint64 = parseInt(object._sint64, 10);
                else if (typeof object._sint64 === "number")
                    message._sint64 = object._sint64;
                else if (typeof object._sint64 === "object")
                    message._sint64 = new $util.LongBits(object._sint64.low >>> 0, object._sint64.high >>> 0).toNumber();
            if (object._fixed32 != null)
                message._fixed32 = object._fixed32 >>> 0;
            if (object._fixed64 != null)
                if ($util.Long)
                    (message._fixed64 = $util.Long.fromValue(object._fixed64)).unsigned = false;
                else if (typeof object._fixed64 === "string")
                    message._fixed64 = parseInt(object._fixed64, 10);
                else if (typeof object._fixed64 === "number")
                    message._fixed64 = object._fixed64;
                else if (typeof object._fixed64 === "object")
                    message._fixed64 = new $util.LongBits(object._fixed64.low >>> 0, object._fixed64.high >>> 0).toNumber();
            if (object._sfixed32 != null)
                message._sfixed32 = object._sfixed32 | 0;
            if (object._sfixed64 != null)
                if ($util.Long)
                    (message._sfixed64 = $util.Long.fromValue(object._sfixed64)).unsigned = false;
                else if (typeof object._sfixed64 === "string")
                    message._sfixed64 = parseInt(object._sfixed64, 10);
                else if (typeof object._sfixed64 === "number")
                    message._sfixed64 = object._sfixed64;
                else if (typeof object._sfixed64 === "object")
                    message._sfixed64 = new $util.LongBits(object._sfixed64.low >>> 0, object._sfixed64.high >>> 0).toNumber();
            if (object._bool != null)
                message._bool = Boolean(object._bool);
            if (object._string != null)
                message._string = String(object._string);
            if (object._bytes != null)
                if (typeof object._bytes === "string")
                    $util.base64.decode(object._bytes, message._bytes = $util.newBuffer($util.base64.length(object._bytes)), 0);
                else if (object._bytes.length)
                    message._bytes = object._bytes;
            switch (object._login_type_enum) {
            case "default_login":
            case 1:
                message._login_type_enum = 1;
                break;
            case "facebook_login":
            case 2:
                message._login_type_enum = 2;
                break;
            case "guest_login":
            case 3:
                message._login_type_enum = 3;
                break;
            case "token_login":
            case 4:
                message._login_type_enum = 4;
                break;
            case "mobile_login":
            case 5:
                message._login_type_enum = 5;
                break;
            case "google_login":
            case 6:
                message._login_type_enum = 6;
                break;
            }
            if (object._required != null)
                message._required = object._required >>> 0;
            if (object._optional != null)
                message._optional = object._optional >>> 0;
            if (object._repeated) {
                if (!Array.isArray(object._repeated))
                    throw TypeError(".up.test_protobuf._repeated: array expected");
                message._repeated = [];
                for (var i = 0; i < object._repeated.length; ++i)
                    message._repeated[i] = object._repeated[i] >>> 0;
            }
            if (object._test_sub_struct != null) {
                if (typeof object._test_sub_struct !== "object")
                    throw TypeError(".up.test_protobuf._test_sub_struct: object expected");
                message._test_sub_struct = $root.up.test_sub_struct.fromObject(object._test_sub_struct);
            }
            return message;
        };

        test_protobuf.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object._repeated = [];
            if (options.defaults) {
                object._double = 0;
                object._float = 0;
                object._int32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object._int64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._int64 = options.longs === String ? "0" : 0;
                object._uint32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uint64 = options.longs === String ? "0" : 0;
                object._sint32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object._sint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._sint64 = options.longs === String ? "0" : 0;
                object._fixed32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object._fixed64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._fixed64 = options.longs === String ? "0" : 0;
                object._sfixed32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object._sfixed64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._sfixed64 = options.longs === String ? "0" : 0;
                object._bool = false;
                object._string = "";
                if (options.bytes === String)
                    object._bytes = "";
                else {
                    object._bytes = [];
                    if (options.bytes !== Array)
                        object._bytes = $util.newBuffer(object._bytes);
                }
                object._login_type_enum = options.enums === String ? "default_login" : 1;
                object._required = 0;
                object._optional = 10;
                object._test_sub_struct = null;
            }
            if (message._double != null && message.hasOwnProperty("_double"))
                object._double = options.json && !isFinite(message._double) ? String(message._double) : message._double;
            if (message._float != null && message.hasOwnProperty("_float"))
                object._float = options.json && !isFinite(message._float) ? String(message._float) : message._float;
            if (message._int32 != null && message.hasOwnProperty("_int32"))
                object._int32 = message._int32;
            if (message._int64 != null && message.hasOwnProperty("_int64"))
                if (typeof message._int64 === "number")
                    object._int64 = options.longs === String ? String(message._int64) : message._int64;
                else
                    object._int64 = options.longs === String ? $util.Long.prototype.toString.call(message._int64) : options.longs === Number ? new $util.LongBits(message._int64.low >>> 0, message._int64.high >>> 0).toNumber() : message._int64;
            if (message._uint32 != null && message.hasOwnProperty("_uint32"))
                object._uint32 = message._uint32;
            if (message._uint64 != null && message.hasOwnProperty("_uint64"))
                if (typeof message._uint64 === "number")
                    object._uint64 = options.longs === String ? String(message._uint64) : message._uint64;
                else
                    object._uint64 = options.longs === String ? $util.Long.prototype.toString.call(message._uint64) : options.longs === Number ? new $util.LongBits(message._uint64.low >>> 0, message._uint64.high >>> 0).toNumber(true) : message._uint64;
            if (message._sint32 != null && message.hasOwnProperty("_sint32"))
                object._sint32 = message._sint32;
            if (message._sint64 != null && message.hasOwnProperty("_sint64"))
                if (typeof message._sint64 === "number")
                    object._sint64 = options.longs === String ? String(message._sint64) : message._sint64;
                else
                    object._sint64 = options.longs === String ? $util.Long.prototype.toString.call(message._sint64) : options.longs === Number ? new $util.LongBits(message._sint64.low >>> 0, message._sint64.high >>> 0).toNumber() : message._sint64;
            if (message._fixed32 != null && message.hasOwnProperty("_fixed32"))
                object._fixed32 = message._fixed32;
            if (message._fixed64 != null && message.hasOwnProperty("_fixed64"))
                if (typeof message._fixed64 === "number")
                    object._fixed64 = options.longs === String ? String(message._fixed64) : message._fixed64;
                else
                    object._fixed64 = options.longs === String ? $util.Long.prototype.toString.call(message._fixed64) : options.longs === Number ? new $util.LongBits(message._fixed64.low >>> 0, message._fixed64.high >>> 0).toNumber() : message._fixed64;
            if (message._sfixed32 != null && message.hasOwnProperty("_sfixed32"))
                object._sfixed32 = message._sfixed32;
            if (message._sfixed64 != null && message.hasOwnProperty("_sfixed64"))
                if (typeof message._sfixed64 === "number")
                    object._sfixed64 = options.longs === String ? String(message._sfixed64) : message._sfixed64;
                else
                    object._sfixed64 = options.longs === String ? $util.Long.prototype.toString.call(message._sfixed64) : options.longs === Number ? new $util.LongBits(message._sfixed64.low >>> 0, message._sfixed64.high >>> 0).toNumber() : message._sfixed64;
            if (message._bool != null && message.hasOwnProperty("_bool"))
                object._bool = message._bool;
            if (message._string != null && message.hasOwnProperty("_string"))
                object._string = message._string;
            if (message._bytes != null && message.hasOwnProperty("_bytes"))
                object._bytes = options.bytes === String ? $util.base64.encode(message._bytes, 0, message._bytes.length) : options.bytes === Array ? Array.prototype.slice.call(message._bytes) : message._bytes;
            if (message._login_type_enum != null && message.hasOwnProperty("_login_type_enum"))
                object._login_type_enum = options.enums === String ? $root.up.login_type_enum[message._login_type_enum] : message._login_type_enum;
            if (message._required != null && message.hasOwnProperty("_required"))
                object._required = message._required;
            if (message._optional != null && message.hasOwnProperty("_optional"))
                object._optional = message._optional;
            if (message._repeated && message._repeated.length) {
                object._repeated = [];
                for (var j = 0; j < message._repeated.length; ++j)
                    object._repeated[j] = message._repeated[j];
            }
            if (message._test_sub_struct != null && message.hasOwnProperty("_test_sub_struct"))
                object._test_sub_struct = $root.up.test_sub_struct.toObject(message._test_sub_struct, options);
            return object;
        };

        test_protobuf.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return test_protobuf;
    })();

    up.TestOtherProtobuf = (function() {

        function TestOtherProtobuf(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        TestOtherProtobuf.prototype.Adouble = 0;
        TestOtherProtobuf.prototype.Afloat = 0;
        TestOtherProtobuf.prototype.Aint32 = 0;
        TestOtherProtobuf.prototype.Aint64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        TestOtherProtobuf.prototype.Auint32 = 0;
        TestOtherProtobuf.prototype.Auint64 = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        TestOtherProtobuf.prototype.Asint32 = 0;
        TestOtherProtobuf.prototype.Asint64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        TestOtherProtobuf.prototype.Afixed32 = 0;
        TestOtherProtobuf.prototype.Afixed64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        TestOtherProtobuf.prototype.Asfixed32 = 0;
        TestOtherProtobuf.prototype.Asfixed64 = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        TestOtherProtobuf.prototype.Abool = false;
        TestOtherProtobuf.prototype.Astring = "";
        TestOtherProtobuf.prototype.Abytes = $util.newBuffer([]);

        TestOtherProtobuf.create = function create(properties) {
            return new TestOtherProtobuf(properties);
        };

        TestOtherProtobuf.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Adouble != null && message.hasOwnProperty("Adouble"))
                writer.uint32(9).double(message.Adouble);
            if (message.Afloat != null && message.hasOwnProperty("Afloat"))
                writer.uint32(21).float(message.Afloat);
            if (message.Aint32 != null && message.hasOwnProperty("Aint32"))
                writer.uint32(24).int32(message.Aint32);
            if (message.Aint64 != null && message.hasOwnProperty("Aint64"))
                writer.uint32(32).int64(message.Aint64);
            if (message.Auint32 != null && message.hasOwnProperty("Auint32"))
                writer.uint32(40).uint32(message.Auint32);
            if (message.Auint64 != null && message.hasOwnProperty("Auint64"))
                writer.uint32(48).uint64(message.Auint64);
            if (message.Asint32 != null && message.hasOwnProperty("Asint32"))
                writer.uint32(56).sint32(message.Asint32);
            if (message.Asint64 != null && message.hasOwnProperty("Asint64"))
                writer.uint32(64).sint64(message.Asint64);
            if (message.Afixed32 != null && message.hasOwnProperty("Afixed32"))
                writer.uint32(77).fixed32(message.Afixed32);
            if (message.Afixed64 != null && message.hasOwnProperty("Afixed64"))
                writer.uint32(81).fixed64(message.Afixed64);
            if (message.Asfixed32 != null && message.hasOwnProperty("Asfixed32"))
                writer.uint32(93).sfixed32(message.Asfixed32);
            if (message.Asfixed64 != null && message.hasOwnProperty("Asfixed64"))
                writer.uint32(97).sfixed64(message.Asfixed64);
            if (message.Abool != null && message.hasOwnProperty("Abool"))
                writer.uint32(104).bool(message.Abool);
            if (message.Astring != null && message.hasOwnProperty("Astring"))
                writer.uint32(114).string(message.Astring);
            if (message.Abytes != null && message.hasOwnProperty("Abytes"))
                writer.uint32(122).bytes(message.Abytes);
            return writer;
        };

        TestOtherProtobuf.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        TestOtherProtobuf.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.TestOtherProtobuf();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Adouble = reader.double();
                    break;
                case 2:
                    message.Afloat = reader.float();
                    break;
                case 3:
                    message.Aint32 = reader.int32();
                    break;
                case 4:
                    message.Aint64 = reader.int64();
                    break;
                case 5:
                    message.Auint32 = reader.uint32();
                    break;
                case 6:
                    message.Auint64 = reader.uint64();
                    break;
                case 7:
                    message.Asint32 = reader.sint32();
                    break;
                case 8:
                    message.Asint64 = reader.sint64();
                    break;
                case 9:
                    message.Afixed32 = reader.fixed32();
                    break;
                case 10:
                    message.Afixed64 = reader.fixed64();
                    break;
                case 11:
                    message.Asfixed32 = reader.sfixed32();
                    break;
                case 12:
                    message.Asfixed64 = reader.sfixed64();
                    break;
                case 13:
                    message.Abool = reader.bool();
                    break;
                case 14:
                    message.Astring = reader.string();
                    break;
                case 15:
                    message.Abytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        TestOtherProtobuf.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        TestOtherProtobuf.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Adouble != null && message.hasOwnProperty("Adouble"))
                if (typeof message.Adouble !== "number")
                    return "Adouble: number expected";
            if (message.Afloat != null && message.hasOwnProperty("Afloat"))
                if (typeof message.Afloat !== "number")
                    return "Afloat: number expected";
            if (message.Aint32 != null && message.hasOwnProperty("Aint32"))
                if (!$util.isInteger(message.Aint32))
                    return "Aint32: integer expected";
            if (message.Aint64 != null && message.hasOwnProperty("Aint64"))
                if (!$util.isInteger(message.Aint64) && !(message.Aint64 && $util.isInteger(message.Aint64.low) && $util.isInteger(message.Aint64.high)))
                    return "Aint64: integer|Long expected";
            if (message.Auint32 != null && message.hasOwnProperty("Auint32"))
                if (!$util.isInteger(message.Auint32))
                    return "Auint32: integer expected";
            if (message.Auint64 != null && message.hasOwnProperty("Auint64"))
                if (!$util.isInteger(message.Auint64) && !(message.Auint64 && $util.isInteger(message.Auint64.low) && $util.isInteger(message.Auint64.high)))
                    return "Auint64: integer|Long expected";
            if (message.Asint32 != null && message.hasOwnProperty("Asint32"))
                if (!$util.isInteger(message.Asint32))
                    return "Asint32: integer expected";
            if (message.Asint64 != null && message.hasOwnProperty("Asint64"))
                if (!$util.isInteger(message.Asint64) && !(message.Asint64 && $util.isInteger(message.Asint64.low) && $util.isInteger(message.Asint64.high)))
                    return "Asint64: integer|Long expected";
            if (message.Afixed32 != null && message.hasOwnProperty("Afixed32"))
                if (!$util.isInteger(message.Afixed32))
                    return "Afixed32: integer expected";
            if (message.Afixed64 != null && message.hasOwnProperty("Afixed64"))
                if (!$util.isInteger(message.Afixed64) && !(message.Afixed64 && $util.isInteger(message.Afixed64.low) && $util.isInteger(message.Afixed64.high)))
                    return "Afixed64: integer|Long expected";
            if (message.Asfixed32 != null && message.hasOwnProperty("Asfixed32"))
                if (!$util.isInteger(message.Asfixed32))
                    return "Asfixed32: integer expected";
            if (message.Asfixed64 != null && message.hasOwnProperty("Asfixed64"))
                if (!$util.isInteger(message.Asfixed64) && !(message.Asfixed64 && $util.isInteger(message.Asfixed64.low) && $util.isInteger(message.Asfixed64.high)))
                    return "Asfixed64: integer|Long expected";
            if (message.Abool != null && message.hasOwnProperty("Abool"))
                if (typeof message.Abool !== "boolean")
                    return "Abool: boolean expected";
            if (message.Astring != null && message.hasOwnProperty("Astring"))
                if (!$util.isString(message.Astring))
                    return "Astring: string expected";
            if (message.Abytes != null && message.hasOwnProperty("Abytes"))
                if (!(message.Abytes && typeof message.Abytes.length === "number" || $util.isString(message.Abytes)))
                    return "Abytes: buffer expected";
            return null;
        };

        TestOtherProtobuf.fromObject = function fromObject(object) {
            if (object instanceof $root.up.TestOtherProtobuf)
                return object;
            var message = new $root.up.TestOtherProtobuf();
            if (object.Adouble != null)
                message.Adouble = Number(object.Adouble);
            if (object.Afloat != null)
                message.Afloat = Number(object.Afloat);
            if (object.Aint32 != null)
                message.Aint32 = object.Aint32 | 0;
            if (object.Aint64 != null)
                if ($util.Long)
                    (message.Aint64 = $util.Long.fromValue(object.Aint64)).unsigned = false;
                else if (typeof object.Aint64 === "string")
                    message.Aint64 = parseInt(object.Aint64, 10);
                else if (typeof object.Aint64 === "number")
                    message.Aint64 = object.Aint64;
                else if (typeof object.Aint64 === "object")
                    message.Aint64 = new $util.LongBits(object.Aint64.low >>> 0, object.Aint64.high >>> 0).toNumber();
            if (object.Auint32 != null)
                message.Auint32 = object.Auint32 >>> 0;
            if (object.Auint64 != null)
                if ($util.Long)
                    (message.Auint64 = $util.Long.fromValue(object.Auint64)).unsigned = true;
                else if (typeof object.Auint64 === "string")
                    message.Auint64 = parseInt(object.Auint64, 10);
                else if (typeof object.Auint64 === "number")
                    message.Auint64 = object.Auint64;
                else if (typeof object.Auint64 === "object")
                    message.Auint64 = new $util.LongBits(object.Auint64.low >>> 0, object.Auint64.high >>> 0).toNumber(true);
            if (object.Asint32 != null)
                message.Asint32 = object.Asint32 | 0;
            if (object.Asint64 != null)
                if ($util.Long)
                    (message.Asint64 = $util.Long.fromValue(object.Asint64)).unsigned = false;
                else if (typeof object.Asint64 === "string")
                    message.Asint64 = parseInt(object.Asint64, 10);
                else if (typeof object.Asint64 === "number")
                    message.Asint64 = object.Asint64;
                else if (typeof object.Asint64 === "object")
                    message.Asint64 = new $util.LongBits(object.Asint64.low >>> 0, object.Asint64.high >>> 0).toNumber();
            if (object.Afixed32 != null)
                message.Afixed32 = object.Afixed32 >>> 0;
            if (object.Afixed64 != null)
                if ($util.Long)
                    (message.Afixed64 = $util.Long.fromValue(object.Afixed64)).unsigned = false;
                else if (typeof object.Afixed64 === "string")
                    message.Afixed64 = parseInt(object.Afixed64, 10);
                else if (typeof object.Afixed64 === "number")
                    message.Afixed64 = object.Afixed64;
                else if (typeof object.Afixed64 === "object")
                    message.Afixed64 = new $util.LongBits(object.Afixed64.low >>> 0, object.Afixed64.high >>> 0).toNumber();
            if (object.Asfixed32 != null)
                message.Asfixed32 = object.Asfixed32 | 0;
            if (object.Asfixed64 != null)
                if ($util.Long)
                    (message.Asfixed64 = $util.Long.fromValue(object.Asfixed64)).unsigned = false;
                else if (typeof object.Asfixed64 === "string")
                    message.Asfixed64 = parseInt(object.Asfixed64, 10);
                else if (typeof object.Asfixed64 === "number")
                    message.Asfixed64 = object.Asfixed64;
                else if (typeof object.Asfixed64 === "object")
                    message.Asfixed64 = new $util.LongBits(object.Asfixed64.low >>> 0, object.Asfixed64.high >>> 0).toNumber();
            if (object.Abool != null)
                message.Abool = Boolean(object.Abool);
            if (object.Astring != null)
                message.Astring = String(object.Astring);
            if (object.Abytes != null)
                if (typeof object.Abytes === "string")
                    $util.base64.decode(object.Abytes, message.Abytes = $util.newBuffer($util.base64.length(object.Abytes)), 0);
                else if (object.Abytes.length)
                    message.Abytes = object.Abytes;
            return message;
        };

        TestOtherProtobuf.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Adouble = 0;
                object.Afloat = 0;
                object.Aint32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Aint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Aint64 = options.longs === String ? "0" : 0;
                object.Auint32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.Auint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Auint64 = options.longs === String ? "0" : 0;
                object.Asint32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Asint64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Asint64 = options.longs === String ? "0" : 0;
                object.Afixed32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Afixed64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Afixed64 = options.longs === String ? "0" : 0;
                object.Asfixed32 = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Asfixed64 = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Asfixed64 = options.longs === String ? "0" : 0;
                object.Abool = false;
                object.Astring = "";
                if (options.bytes === String)
                    object.Abytes = "";
                else {
                    object.Abytes = [];
                    if (options.bytes !== Array)
                        object.Abytes = $util.newBuffer(object.Abytes);
                }
            }
            if (message.Adouble != null && message.hasOwnProperty("Adouble"))
                object.Adouble = options.json && !isFinite(message.Adouble) ? String(message.Adouble) : message.Adouble;
            if (message.Afloat != null && message.hasOwnProperty("Afloat"))
                object.Afloat = options.json && !isFinite(message.Afloat) ? String(message.Afloat) : message.Afloat;
            if (message.Aint32 != null && message.hasOwnProperty("Aint32"))
                object.Aint32 = message.Aint32;
            if (message.Aint64 != null && message.hasOwnProperty("Aint64"))
                if (typeof message.Aint64 === "number")
                    object.Aint64 = options.longs === String ? String(message.Aint64) : message.Aint64;
                else
                    object.Aint64 = options.longs === String ? $util.Long.prototype.toString.call(message.Aint64) : options.longs === Number ? new $util.LongBits(message.Aint64.low >>> 0, message.Aint64.high >>> 0).toNumber() : message.Aint64;
            if (message.Auint32 != null && message.hasOwnProperty("Auint32"))
                object.Auint32 = message.Auint32;
            if (message.Auint64 != null && message.hasOwnProperty("Auint64"))
                if (typeof message.Auint64 === "number")
                    object.Auint64 = options.longs === String ? String(message.Auint64) : message.Auint64;
                else
                    object.Auint64 = options.longs === String ? $util.Long.prototype.toString.call(message.Auint64) : options.longs === Number ? new $util.LongBits(message.Auint64.low >>> 0, message.Auint64.high >>> 0).toNumber(true) : message.Auint64;
            if (message.Asint32 != null && message.hasOwnProperty("Asint32"))
                object.Asint32 = message.Asint32;
            if (message.Asint64 != null && message.hasOwnProperty("Asint64"))
                if (typeof message.Asint64 === "number")
                    object.Asint64 = options.longs === String ? String(message.Asint64) : message.Asint64;
                else
                    object.Asint64 = options.longs === String ? $util.Long.prototype.toString.call(message.Asint64) : options.longs === Number ? new $util.LongBits(message.Asint64.low >>> 0, message.Asint64.high >>> 0).toNumber() : message.Asint64;
            if (message.Afixed32 != null && message.hasOwnProperty("Afixed32"))
                object.Afixed32 = message.Afixed32;
            if (message.Afixed64 != null && message.hasOwnProperty("Afixed64"))
                if (typeof message.Afixed64 === "number")
                    object.Afixed64 = options.longs === String ? String(message.Afixed64) : message.Afixed64;
                else
                    object.Afixed64 = options.longs === String ? $util.Long.prototype.toString.call(message.Afixed64) : options.longs === Number ? new $util.LongBits(message.Afixed64.low >>> 0, message.Afixed64.high >>> 0).toNumber() : message.Afixed64;
            if (message.Asfixed32 != null && message.hasOwnProperty("Asfixed32"))
                object.Asfixed32 = message.Asfixed32;
            if (message.Asfixed64 != null && message.hasOwnProperty("Asfixed64"))
                if (typeof message.Asfixed64 === "number")
                    object.Asfixed64 = options.longs === String ? String(message.Asfixed64) : message.Asfixed64;
                else
                    object.Asfixed64 = options.longs === String ? $util.Long.prototype.toString.call(message.Asfixed64) : options.longs === Number ? new $util.LongBits(message.Asfixed64.low >>> 0, message.Asfixed64.high >>> 0).toNumber() : message.Asfixed64;
            if (message.Abool != null && message.hasOwnProperty("Abool"))
                object.Abool = message.Abool;
            if (message.Astring != null && message.hasOwnProperty("Astring"))
                object.Astring = message.Astring;
            if (message.Abytes != null && message.hasOwnProperty("Abytes"))
                object.Abytes = options.bytes === String ? $util.base64.encode(message.Abytes, 0, message.Abytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.Abytes) : message.Abytes;
            return object;
        };

        TestOtherProtobuf.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TestOtherProtobuf;
    })();

    up.handshake = (function() {

        function handshake(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        handshake.prototype._client_version = "";
        handshake.prototype._client_encrypt_key = "";
        handshake.prototype._verify_value = "";

        handshake.create = function create(properties) {
            return new handshake(properties);
        };

        handshake.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._client_version);
            writer.uint32(18).string(message._client_encrypt_key);
            writer.uint32(26).string(message._verify_value);
            return writer;
        };

        handshake.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        handshake.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.handshake();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._client_version = reader.string();
                    break;
                case 2:
                    message._client_encrypt_key = reader.string();
                    break;
                case 3:
                    message._verify_value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_client_version"))
                throw $util.ProtocolError("missing required '_client_version'", { instance: message });
            if (!message.hasOwnProperty("_client_encrypt_key"))
                throw $util.ProtocolError("missing required '_client_encrypt_key'", { instance: message });
            if (!message.hasOwnProperty("_verify_value"))
                throw $util.ProtocolError("missing required '_verify_value'", { instance: message });
            return message;
        };

        handshake.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        handshake.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._client_version))
                return "_client_version: string expected";
            if (!$util.isString(message._client_encrypt_key))
                return "_client_encrypt_key: string expected";
            if (!$util.isString(message._verify_value))
                return "_verify_value: string expected";
            return null;
        };

        handshake.fromObject = function fromObject(object) {
            if (object instanceof $root.up.handshake)
                return object;
            var message = new $root.up.handshake();
            if (object._client_version != null)
                message._client_version = String(object._client_version);
            if (object._client_encrypt_key != null)
                message._client_encrypt_key = String(object._client_encrypt_key);
            if (object._verify_value != null)
                message._verify_value = String(object._verify_value);
            return message;
        };

        handshake.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._client_version = "";
                object._client_encrypt_key = "";
                object._verify_value = "";
            }
            if (message._client_version != null && message.hasOwnProperty("_client_version"))
                object._client_version = message._client_version;
            if (message._client_encrypt_key != null && message.hasOwnProperty("_client_encrypt_key"))
                object._client_encrypt_key = message._client_encrypt_key;
            if (message._verify_value != null && message.hasOwnProperty("_verify_value"))
                object._verify_value = message._verify_value;
            return object;
        };

        handshake.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return handshake;
    })();

    up.keepalive = (function() {

        function keepalive(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        keepalive.prototype._something = "";

        keepalive.create = function create(properties) {
            return new keepalive(properties);
        };

        keepalive.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._something != null && message.hasOwnProperty("_something"))
                writer.uint32(10).string(message._something);
            return writer;
        };

        keepalive.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        keepalive.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.keepalive();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._something = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        keepalive.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        keepalive.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._something != null && message.hasOwnProperty("_something"))
                if (!$util.isString(message._something))
                    return "_something: string expected";
            return null;
        };

        keepalive.fromObject = function fromObject(object) {
            if (object instanceof $root.up.keepalive)
                return object;
            var message = new $root.up.keepalive();
            if (object._something != null)
                message._something = String(object._something);
            return message;
        };

        keepalive.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._something = "";
            if (message._something != null && message.hasOwnProperty("_something"))
                object._something = message._something;
            return object;
        };

        keepalive.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return keepalive;
    })();

    up.login = (function() {

        function login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        login.prototype._login_type = 1;
        login.prototype._name = "";
        login.prototype._password = "";
        login.prototype._bind_data = "";

        login.create = function create(properties) {
            return new login(properties);
        };

        login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).int32(message._login_type);
            if (message._name != null && message.hasOwnProperty("_name"))
                writer.uint32(18).string(message._name);
            if (message._password != null && message.hasOwnProperty("_password"))
                writer.uint32(26).string(message._password);
            if (message._bind_data != null && message.hasOwnProperty("_bind_data"))
                writer.uint32(34).string(message._bind_data);
            return writer;
        };

        login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._login_type = reader.int32();
                    break;
                case 2:
                    message._name = reader.string();
                    break;
                case 3:
                    message._password = reader.string();
                    break;
                case 4:
                    message._bind_data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_login_type"))
                throw $util.ProtocolError("missing required '_login_type'", { instance: message });
            return message;
        };

        login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message._login_type) {
            default:
                return "_login_type: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                break;
            }
            if (message._name != null && message.hasOwnProperty("_name"))
                if (!$util.isString(message._name))
                    return "_name: string expected";
            if (message._password != null && message.hasOwnProperty("_password"))
                if (!$util.isString(message._password))
                    return "_password: string expected";
            if (message._bind_data != null && message.hasOwnProperty("_bind_data"))
                if (!$util.isString(message._bind_data))
                    return "_bind_data: string expected";
            return null;
        };

        login.fromObject = function fromObject(object) {
            if (object instanceof $root.up.login)
                return object;
            var message = new $root.up.login();
            switch (object._login_type) {
            case "default_login":
            case 1:
                message._login_type = 1;
                break;
            case "facebook_login":
            case 2:
                message._login_type = 2;
                break;
            case "guest_login":
            case 3:
                message._login_type = 3;
                break;
            case "token_login":
            case 4:
                message._login_type = 4;
                break;
            case "mobile_login":
            case 5:
                message._login_type = 5;
                break;
            case "google_login":
            case 6:
                message._login_type = 6;
                break;
            }
            if (object._name != null)
                message._name = String(object._name);
            if (object._password != null)
                message._password = String(object._password);
            if (object._bind_data != null)
                message._bind_data = String(object._bind_data);
            return message;
        };

        login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._login_type = options.enums === String ? "default_login" : 1;
                object._name = "";
                object._password = "";
                object._bind_data = "";
            }
            if (message._login_type != null && message.hasOwnProperty("_login_type"))
                object._login_type = options.enums === String ? $root.up.login_type_enum[message._login_type] : message._login_type;
            if (message._name != null && message.hasOwnProperty("_name"))
                object._name = message._name;
            if (message._password != null && message.hasOwnProperty("_password"))
                object._password = message._password;
            if (message._bind_data != null && message.hasOwnProperty("_bind_data"))
                object._bind_data = message._bind_data;
            return object;
        };

        login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return login;
    })();

    up.logout = (function() {

        function logout(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        logout.prototype._reason = 1;

        logout.create = function create(properties) {
            return new logout(properties);
        };

        logout.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).int32(message._reason);
            return writer;
        };

        logout.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        logout.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.logout();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._reason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_reason"))
                throw $util.ProtocolError("missing required '_reason'", { instance: message });
            return message;
        };

        logout.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        logout.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message._reason) {
            default:
                return "_reason: enum value expected";
            case 1:
            case 2:
            case 22:
            case 20:
            case 21:
            case 23:
            case 24:
                break;
            }
            return null;
        };

        logout.fromObject = function fromObject(object) {
            if (object instanceof $root.up.logout)
                return object;
            var message = new $root.up.logout();
            switch (object._reason) {
            case "normal_logout":
            case 1:
                message._reason = 1;
                break;
            case "switch_user":
            case 2:
                message._reason = 2;
                break;
            case "relogin":
            case 22:
                message._reason = 22;
                break;
            case "break_line":
            case 20:
                message._reason = 20;
                break;
            case "for_error":
            case 21:
                message._reason = 21;
                break;
            case "timeout_logout":
            case 23:
                message._reason = 23;
                break;
            case "kick":
            case 24:
                message._reason = 24;
                break;
            }
            return message;
        };

        logout.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._reason = options.enums === String ? "normal_logout" : 1;
            if (message._reason != null && message.hasOwnProperty("_reason"))
                object._reason = options.enums === String ? $root.up.logout_reason_enum[message._reason] : message._reason;
            return object;
        };

        logout.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return logout;
    })();

    up.create_user = (function() {

        function create_user(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        create_user.prototype._user_name = "";
        create_user.prototype._sex = 0;
        create_user.prototype._head_portrait = "";
        create_user.prototype._other_info = "";
        create_user.prototype._is_robot = 0;

        create_user.create = function create(properties) {
            return new create_user(properties);
        };

        create_user.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._user_name);
            if (message._sex != null && message.hasOwnProperty("_sex"))
                writer.uint32(16).uint32(message._sex);
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                writer.uint32(26).string(message._head_portrait);
            if (message._other_info != null && message.hasOwnProperty("_other_info"))
                writer.uint32(34).string(message._other_info);
            if (message._is_robot != null && message.hasOwnProperty("_is_robot"))
                writer.uint32(40).uint32(message._is_robot);
            return writer;
        };

        create_user.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        create_user.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.create_user();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._user_name = reader.string();
                    break;
                case 2:
                    message._sex = reader.uint32();
                    break;
                case 3:
                    message._head_portrait = reader.string();
                    break;
                case 4:
                    message._other_info = reader.string();
                    break;
                case 5:
                    message._is_robot = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_user_name"))
                throw $util.ProtocolError("missing required '_user_name'", { instance: message });
            return message;
        };

        create_user.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        create_user.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._user_name))
                return "_user_name: string expected";
            if (message._sex != null && message.hasOwnProperty("_sex"))
                if (!$util.isInteger(message._sex))
                    return "_sex: integer expected";
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                if (!$util.isString(message._head_portrait))
                    return "_head_portrait: string expected";
            if (message._other_info != null && message.hasOwnProperty("_other_info"))
                if (!$util.isString(message._other_info))
                    return "_other_info: string expected";
            if (message._is_robot != null && message.hasOwnProperty("_is_robot"))
                if (!$util.isInteger(message._is_robot))
                    return "_is_robot: integer expected";
            return null;
        };

        create_user.fromObject = function fromObject(object) {
            if (object instanceof $root.up.create_user)
                return object;
            var message = new $root.up.create_user();
            if (object._user_name != null)
                message._user_name = String(object._user_name);
            if (object._sex != null)
                message._sex = object._sex >>> 0;
            if (object._head_portrait != null)
                message._head_portrait = String(object._head_portrait);
            if (object._other_info != null)
                message._other_info = String(object._other_info);
            if (object._is_robot != null)
                message._is_robot = object._is_robot >>> 0;
            return message;
        };

        create_user.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._user_name = "";
                object._sex = 0;
                object._head_portrait = "";
                object._other_info = "";
                object._is_robot = 0;
            }
            if (message._user_name != null && message.hasOwnProperty("_user_name"))
                object._user_name = message._user_name;
            if (message._sex != null && message.hasOwnProperty("_sex"))
                object._sex = message._sex;
            if (message._head_portrait != null && message.hasOwnProperty("_head_portrait"))
                object._head_portrait = message._head_portrait;
            if (message._other_info != null && message.hasOwnProperty("_other_info"))
                object._other_info = message._other_info;
            if (message._is_robot != null && message.hasOwnProperty("_is_robot"))
                object._is_robot = message._is_robot;
            return object;
        };

        create_user.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return create_user;
    })();

    up.get_user_info = (function() {

        function get_user_info(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_user_info.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        get_user_info.create = function create(properties) {
            return new get_user_info(properties);
        };

        get_user_info.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._uid != null && message.hasOwnProperty("_uid"))
                writer.uint32(8).uint64(message._uid);
            return writer;
        };

        get_user_info.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_user_info.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_user_info();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_user_info.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_user_info.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                    return "_uid: integer|Long expected";
            return null;
        };

        get_user_info.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_user_info)
                return object;
            var message = new $root.up.get_user_info();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        get_user_info.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        get_user_info.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_user_info;
    })();

    up.modify_user_info = (function() {

        function modify_user_info(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        modify_user_info.prototype._user_info = null;

        modify_user_info.create = function create(properties) {
            return new modify_user_info(properties);
        };

        modify_user_info.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._user_info != null && message.hasOwnProperty("_user_info"))
                $root.up.user_base_info_struct.encode(message._user_info, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        modify_user_info.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        modify_user_info.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.modify_user_info();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._user_info = $root.up.user_base_info_struct.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        modify_user_info.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        modify_user_info.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._user_info != null && message.hasOwnProperty("_user_info")) {
                var error = $root.up.user_base_info_struct.verify(message._user_info);
                if (error)
                    return "_user_info." + error;
            }
            return null;
        };

        modify_user_info.fromObject = function fromObject(object) {
            if (object instanceof $root.up.modify_user_info)
                return object;
            var message = new $root.up.modify_user_info();
            if (object._user_info != null) {
                if (typeof object._user_info !== "object")
                    throw TypeError(".up.modify_user_info._user_info: object expected");
                message._user_info = $root.up.user_base_info_struct.fromObject(object._user_info);
            }
            return message;
        };

        modify_user_info.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._user_info = null;
            if (message._user_info != null && message.hasOwnProperty("_user_info"))
                object._user_info = $root.up.user_base_info_struct.toObject(message._user_info, options);
            return object;
        };

        modify_user_info.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return modify_user_info;
    })();

    up.chat = (function() {

        function chat(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        chat.prototype._type = 1;
        chat.prototype._data = "";
        chat.prototype._channel = 1;
        chat.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        chat.prototype._timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        chat.create = function create(properties) {
            return new chat(properties);
        };

        chat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).int32(message._type);
            if (message._data != null && message.hasOwnProperty("_data"))
                writer.uint32(18).string(message._data);
            if (message._channel != null && message.hasOwnProperty("_channel"))
                writer.uint32(24).int32(message._channel);
            if (message._uid != null && message.hasOwnProperty("_uid"))
                writer.uint32(32).uint64(message._uid);
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                writer.uint32(40).uint64(message._timestamp);
            return writer;
        };

        chat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        chat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.chat();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._type = reader.int32();
                    break;
                case 2:
                    message._data = reader.string();
                    break;
                case 3:
                    message._channel = reader.int32();
                    break;
                case 4:
                    message._uid = reader.uint64();
                    break;
                case 5:
                    message._timestamp = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_type"))
                throw $util.ProtocolError("missing required '_type'", { instance: message });
            return message;
        };

        chat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        chat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message._type) {
            default:
                return "_type: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
            if (message._data != null && message.hasOwnProperty("_data"))
                if (!$util.isString(message._data))
                    return "_data: string expected";
            if (message._channel != null && message.hasOwnProperty("_channel"))
                switch (message._channel) {
                default:
                    return "_channel: enum value expected";
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                    return "_uid: integer|Long expected";
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (!$util.isInteger(message._timestamp) && !(message._timestamp && $util.isInteger(message._timestamp.low) && $util.isInteger(message._timestamp.high)))
                    return "_timestamp: integer|Long expected";
            return null;
        };

        chat.fromObject = function fromObject(object) {
            if (object instanceof $root.up.chat)
                return object;
            var message = new $root.up.chat();
            switch (object._type) {
            case "chat_optional":
            case 1:
                message._type = 1;
                break;
            case "chat_face":
            case 2:
                message._type = 2;
                break;
            case "chat_voice":
            case 3:
                message._type = 3;
                break;
            case "chat_custom":
            case 4:
                message._type = 4;
                break;
            }
            if (object._data != null)
                message._data = String(object._data);
            switch (object._channel) {
            case "playing":
            case 1:
                message._channel = 1;
                break;
            case "private":
            case 2:
                message._channel = 2;
                break;
            case "cur_game":
            case 3:
                message._channel = 3;
                break;
            case "all_world":
            case 4:
                message._channel = 4;
                break;
            case "game_guild":
            case 5:
                message._channel = 5;
                break;
            }
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._timestamp != null)
                if ($util.Long)
                    (message._timestamp = $util.Long.fromValue(object._timestamp)).unsigned = true;
                else if (typeof object._timestamp === "string")
                    message._timestamp = parseInt(object._timestamp, 10);
                else if (typeof object._timestamp === "number")
                    message._timestamp = object._timestamp;
                else if (typeof object._timestamp === "object")
                    message._timestamp = new $util.LongBits(object._timestamp.low >>> 0, object._timestamp.high >>> 0).toNumber(true);
            return message;
        };

        chat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._type = options.enums === String ? "chat_optional" : 1;
                object._data = "";
                object._channel = options.enums === String ? "playing" : 1;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._timestamp = options.longs === String ? "0" : 0;
            }
            if (message._type != null && message.hasOwnProperty("_type"))
                object._type = options.enums === String ? $root.up.chat_type[message._type] : message._type;
            if (message._data != null && message.hasOwnProperty("_data"))
                object._data = message._data;
            if (message._channel != null && message.hasOwnProperty("_channel"))
                object._channel = options.enums === String ? $root.up.chat_channel[message._channel] : message._channel;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (typeof message._timestamp === "number")
                    object._timestamp = options.longs === String ? String(message._timestamp) : message._timestamp;
                else
                    object._timestamp = options.longs === String ? $util.Long.prototype.toString.call(message._timestamp) : options.longs === Number ? new $util.LongBits(message._timestamp.low >>> 0, message._timestamp.high >>> 0).toNumber(true) : message._timestamp;
            return object;
        };

        chat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return chat;
    })();

    up.suggest = (function() {

        function suggest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        suggest.prototype._type = "";
        suggest.prototype._data = "";

        suggest.create = function create(properties) {
            return new suggest(properties);
        };

        suggest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._type);
            writer.uint32(18).string(message._data);
            return writer;
        };

        suggest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        suggest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.suggest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._type = reader.string();
                    break;
                case 2:
                    message._data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_type"))
                throw $util.ProtocolError("missing required '_type'", { instance: message });
            if (!message.hasOwnProperty("_data"))
                throw $util.ProtocolError("missing required '_data'", { instance: message });
            return message;
        };

        suggest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        suggest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._type))
                return "_type: string expected";
            if (!$util.isString(message._data))
                return "_data: string expected";
            return null;
        };

        suggest.fromObject = function fromObject(object) {
            if (object instanceof $root.up.suggest)
                return object;
            var message = new $root.up.suggest();
            if (object._type != null)
                message._type = String(object._type);
            if (object._data != null)
                message._data = String(object._data);
            return message;
        };

        suggest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._type = "";
                object._data = "";
            }
            if (message._type != null && message.hasOwnProperty("_type"))
                object._type = message._type;
            if (message._data != null && message.hasOwnProperty("_data"))
                object._data = message._data;
            return object;
        };

        suggest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return suggest;
    })();

    up.match_game = (function() {

        function match_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        match_game.prototype._gid = "";
        match_game.prototype._room_id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        match_game.create = function create(properties) {
            return new match_game(properties);
        };

        match_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                writer.uint32(16).uint64(message._room_id);
            return writer;
        };

        match_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        match_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.match_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._room_id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        match_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        match_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (!$util.isInteger(message._room_id) && !(message._room_id && $util.isInteger(message._room_id.low) && $util.isInteger(message._room_id.high)))
                    return "_room_id: integer|Long expected";
            return null;
        };

        match_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.match_game)
                return object;
            var message = new $root.up.match_game();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._room_id != null)
                if ($util.Long)
                    (message._room_id = $util.Long.fromValue(object._room_id)).unsigned = true;
                else if (typeof object._room_id === "string")
                    message._room_id = parseInt(object._room_id, 10);
                else if (typeof object._room_id === "number")
                    message._room_id = object._room_id;
                else if (typeof object._room_id === "object")
                    message._room_id = new $util.LongBits(object._room_id.low >>> 0, object._room_id.high >>> 0).toNumber(true);
            return message;
        };

        match_game.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._room_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._room_id = options.longs === String ? "0" : 0;
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (typeof message._room_id === "number")
                    object._room_id = options.longs === String ? String(message._room_id) : message._room_id;
                else
                    object._room_id = options.longs === String ? $util.Long.prototype.toString.call(message._room_id) : options.longs === Number ? new $util.LongBits(message._room_id.low >>> 0, message._room_id.high >>> 0).toNumber(true) : message._room_id;
            return object;
        };

        match_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return match_game;
    })();

    up.cancel_match_game = (function() {

        function cancel_match_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        cancel_match_game.create = function create(properties) {
            return new cancel_match_game(properties);
        };

        cancel_match_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        cancel_match_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        cancel_match_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.cancel_match_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        cancel_match_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        cancel_match_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        cancel_match_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.cancel_match_game)
                return object;
            return new $root.up.cancel_match_game();
        };

        cancel_match_game.toObject = function toObject() {
            return {};
        };

        cancel_match_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return cancel_match_game;
    })();

    up.game_ready = (function() {

        function game_ready(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        game_ready.create = function create(properties) {
            return new game_ready(properties);
        };

        game_ready.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        game_ready.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        game_ready.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.game_ready();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        game_ready.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        game_ready.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        game_ready.fromObject = function fromObject(object) {
            if (object instanceof $root.up.game_ready)
                return object;
            return new $root.up.game_ready();
        };

        game_ready.toObject = function toObject() {
            return {};
        };

        game_ready.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return game_ready;
    })();

    up.reentry_game = (function() {

        function reentry_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        reentry_game.prototype._gid = "";

        reentry_game.create = function create(properties) {
            return new reentry_game(properties);
        };

        reentry_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            return writer;
        };

        reentry_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        reentry_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.reentry_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        reentry_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        reentry_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            return null;
        };

        reentry_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.reentry_game)
                return object;
            var message = new $root.up.reentry_game();
            if (object._gid != null)
                message._gid = String(object._gid);
            return message;
        };

        reentry_game.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._gid = "";
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            return object;
        };

        reentry_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return reentry_game;
    })();

    up.quit_game = (function() {

        function quit_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        quit_game.create = function create(properties) {
            return new quit_game(properties);
        };

        quit_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        quit_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        quit_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.quit_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        quit_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        quit_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        quit_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.quit_game)
                return object;
            return new $root.up.quit_game();
        };

        quit_game.toObject = function toObject() {
            return {};
        };

        quit_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return quit_game;
    })();

    up.game_score_change = (function() {

        function game_score_change(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        game_score_change.prototype._cur_score = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        game_score_change.prototype._robot_uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        game_score_change.create = function create(properties) {
            return new game_score_change(properties);
        };

        game_score_change.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._cur_score);
            if (message._robot_uid != null && message.hasOwnProperty("_robot_uid"))
                writer.uint32(16).uint64(message._robot_uid);
            return writer;
        };

        game_score_change.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        game_score_change.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.game_score_change();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._cur_score = reader.uint64();
                    break;
                case 2:
                    message._robot_uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_cur_score"))
                throw $util.ProtocolError("missing required '_cur_score'", { instance: message });
            return message;
        };

        game_score_change.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        game_score_change.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._cur_score) && !(message._cur_score && $util.isInteger(message._cur_score.low) && $util.isInteger(message._cur_score.high)))
                return "_cur_score: integer|Long expected";
            if (message._robot_uid != null && message.hasOwnProperty("_robot_uid"))
                if (!$util.isInteger(message._robot_uid) && !(message._robot_uid && $util.isInteger(message._robot_uid.low) && $util.isInteger(message._robot_uid.high)))
                    return "_robot_uid: integer|Long expected";
            return null;
        };

        game_score_change.fromObject = function fromObject(object) {
            if (object instanceof $root.up.game_score_change)
                return object;
            var message = new $root.up.game_score_change();
            if (object._cur_score != null)
                if ($util.Long)
                    (message._cur_score = $util.Long.fromValue(object._cur_score)).unsigned = true;
                else if (typeof object._cur_score === "string")
                    message._cur_score = parseInt(object._cur_score, 10);
                else if (typeof object._cur_score === "number")
                    message._cur_score = object._cur_score;
                else if (typeof object._cur_score === "object")
                    message._cur_score = new $util.LongBits(object._cur_score.low >>> 0, object._cur_score.high >>> 0).toNumber(true);
            if (object._robot_uid != null)
                if ($util.Long)
                    (message._robot_uid = $util.Long.fromValue(object._robot_uid)).unsigned = true;
                else if (typeof object._robot_uid === "string")
                    message._robot_uid = parseInt(object._robot_uid, 10);
                else if (typeof object._robot_uid === "number")
                    message._robot_uid = object._robot_uid;
                else if (typeof object._robot_uid === "object")
                    message._robot_uid = new $util.LongBits(object._robot_uid.low >>> 0, object._robot_uid.high >>> 0).toNumber(true);
            return message;
        };

        game_score_change.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._cur_score = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._cur_score = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._robot_uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._robot_uid = options.longs === String ? "0" : 0;
            }
            if (message._cur_score != null && message.hasOwnProperty("_cur_score"))
                if (typeof message._cur_score === "number")
                    object._cur_score = options.longs === String ? String(message._cur_score) : message._cur_score;
                else
                    object._cur_score = options.longs === String ? $util.Long.prototype.toString.call(message._cur_score) : options.longs === Number ? new $util.LongBits(message._cur_score.low >>> 0, message._cur_score.high >>> 0).toNumber(true) : message._cur_score;
            if (message._robot_uid != null && message.hasOwnProperty("_robot_uid"))
                if (typeof message._robot_uid === "number")
                    object._robot_uid = options.longs === String ? String(message._robot_uid) : message._robot_uid;
                else
                    object._robot_uid = options.longs === String ? $util.Long.prototype.toString.call(message._robot_uid) : options.longs === Number ? new $util.LongBits(message._robot_uid.low >>> 0, message._robot_uid.high >>> 0).toNumber(true) : message._robot_uid;
            return object;
        };

        game_score_change.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return game_score_change;
    })();

    up.game_private_data = (function() {

        function game_private_data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        game_private_data.prototype._cmd = "";
        game_private_data.prototype._private_data = "";

        game_private_data.create = function create(properties) {
            return new game_private_data(properties);
        };

        game_private_data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                writer.uint32(10).string(message._cmd);
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                writer.uint32(18).string(message._private_data);
            return writer;
        };

        game_private_data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        game_private_data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.game_private_data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._cmd = reader.string();
                    break;
                case 2:
                    message._private_data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        game_private_data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        game_private_data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                if (!$util.isString(message._cmd))
                    return "_cmd: string expected";
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                if (!$util.isString(message._private_data))
                    return "_private_data: string expected";
            return null;
        };

        game_private_data.fromObject = function fromObject(object) {
            if (object instanceof $root.up.game_private_data)
                return object;
            var message = new $root.up.game_private_data();
            if (object._cmd != null)
                message._cmd = String(object._cmd);
            if (object._private_data != null)
                message._private_data = String(object._private_data);
            return message;
        };

        game_private_data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._cmd = "";
                object._private_data = "";
            }
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                object._cmd = message._cmd;
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                object._private_data = message._private_data;
            return object;
        };

        game_private_data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return game_private_data;
    })();

    up.send_game_private_data = (function() {

        function send_game_private_data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        send_game_private_data.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        send_game_private_data.prototype._cmd = "";
        send_game_private_data.prototype._private_data = "";

        send_game_private_data.create = function create(properties) {
            return new send_game_private_data(properties);
        };

        send_game_private_data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._uid != null && message.hasOwnProperty("_uid"))
                writer.uint32(8).uint64(message._uid);
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                writer.uint32(18).string(message._cmd);
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                writer.uint32(26).string(message._private_data);
            return writer;
        };

        send_game_private_data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        send_game_private_data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.send_game_private_data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._cmd = reader.string();
                    break;
                case 3:
                    message._private_data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        send_game_private_data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        send_game_private_data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                    return "_uid: integer|Long expected";
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                if (!$util.isString(message._cmd))
                    return "_cmd: string expected";
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                if (!$util.isString(message._private_data))
                    return "_private_data: string expected";
            return null;
        };

        send_game_private_data.fromObject = function fromObject(object) {
            if (object instanceof $root.up.send_game_private_data)
                return object;
            var message = new $root.up.send_game_private_data();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._cmd != null)
                message._cmd = String(object._cmd);
            if (object._private_data != null)
                message._private_data = String(object._private_data);
            return message;
        };

        send_game_private_data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._cmd = "";
                object._private_data = "";
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                object._cmd = message._cmd;
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                object._private_data = message._private_data;
            return object;
        };

        send_game_private_data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return send_game_private_data;
    })();

    up.broadcast_game_private_data = (function() {

        function broadcast_game_private_data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        broadcast_game_private_data.prototype._cmd = "";
        broadcast_game_private_data.prototype._private_data = "";

        broadcast_game_private_data.create = function create(properties) {
            return new broadcast_game_private_data(properties);
        };

        broadcast_game_private_data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                writer.uint32(10).string(message._cmd);
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                writer.uint32(18).string(message._private_data);
            return writer;
        };

        broadcast_game_private_data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        broadcast_game_private_data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.broadcast_game_private_data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._cmd = reader.string();
                    break;
                case 2:
                    message._private_data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        broadcast_game_private_data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        broadcast_game_private_data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                if (!$util.isString(message._cmd))
                    return "_cmd: string expected";
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                if (!$util.isString(message._private_data))
                    return "_private_data: string expected";
            return null;
        };

        broadcast_game_private_data.fromObject = function fromObject(object) {
            if (object instanceof $root.up.broadcast_game_private_data)
                return object;
            var message = new $root.up.broadcast_game_private_data();
            if (object._cmd != null)
                message._cmd = String(object._cmd);
            if (object._private_data != null)
                message._private_data = String(object._private_data);
            return message;
        };

        broadcast_game_private_data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._cmd = "";
                object._private_data = "";
            }
            if (message._cmd != null && message.hasOwnProperty("_cmd"))
                object._cmd = message._cmd;
            if (message._private_data != null && message.hasOwnProperty("_private_data"))
                object._private_data = message._private_data;
            return object;
        };

        broadcast_game_private_data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return broadcast_game_private_data;
    })();

    up.game_over = (function() {

        function game_over(properties) {
            this._uid_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        game_over.prototype._uid_list = $util.emptyArray;
        game_over.prototype._ret = 0;

        game_over.create = function create(properties) {
            return new game_over(properties);
        };

        game_over.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._uid_list != null && message._uid_list.length)
                for (var i = 0; i < message._uid_list.length; ++i)
                    writer.uint32(8).int32(message._uid_list[i]);
            writer.uint32(16).int32(message._ret);
            return writer;
        };

        game_over.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        game_over.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.game_over();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message._uid_list && message._uid_list.length))
                        message._uid_list = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message._uid_list.push(reader.int32());
                    } else
                        message._uid_list.push(reader.int32());
                    break;
                case 2:
                    message._ret = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_ret"))
                throw $util.ProtocolError("missing required '_ret'", { instance: message });
            return message;
        };

        game_over.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        game_over.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._uid_list != null && message.hasOwnProperty("_uid_list")) {
                if (!Array.isArray(message._uid_list))
                    return "_uid_list: array expected";
                for (var i = 0; i < message._uid_list.length; ++i)
                    if (!$util.isInteger(message._uid_list[i]))
                        return "_uid_list: integer[] expected";
            }
            if (!$util.isInteger(message._ret))
                return "_ret: integer expected";
            return null;
        };

        game_over.fromObject = function fromObject(object) {
            if (object instanceof $root.up.game_over)
                return object;
            var message = new $root.up.game_over();
            if (object._uid_list) {
                if (!Array.isArray(object._uid_list))
                    throw TypeError(".up.game_over._uid_list: array expected");
                message._uid_list = [];
                for (var i = 0; i < object._uid_list.length; ++i)
                    message._uid_list[i] = object._uid_list[i] | 0;
            }
            if (object._ret != null)
                message._ret = object._ret | 0;
            return message;
        };

        game_over.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object._uid_list = [];
            if (options.defaults)
                object._ret = 0;
            if (message._uid_list && message._uid_list.length) {
                object._uid_list = [];
                for (var j = 0; j < message._uid_list.length; ++j)
                    object._uid_list[j] = message._uid_list[j];
            }
            if (message._ret != null && message.hasOwnProperty("_ret"))
                object._ret = message._ret;
            return object;
        };

        game_over.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return game_over;
    })();

    up.get_love_game_list = (function() {

        function get_love_game_list(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_love_game_list.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        get_love_game_list.create = function create(properties) {
            return new get_love_game_list(properties);
        };

        get_love_game_list.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._uid != null && message.hasOwnProperty("_uid"))
                writer.uint32(8).uint64(message._uid);
            return writer;
        };

        get_love_game_list.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_love_game_list.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_love_game_list();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_love_game_list.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_love_game_list.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                    return "_uid: integer|Long expected";
            return null;
        };

        get_love_game_list.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_love_game_list)
                return object;
            var message = new $root.up.get_love_game_list();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        get_love_game_list.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        get_love_game_list.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_love_game_list;
    })();

    up.get_game_data = (function() {

        function get_game_data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_game_data.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        get_game_data.create = function create(properties) {
            return new get_game_data(properties);
        };

        get_game_data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._uid != null && message.hasOwnProperty("_uid"))
                writer.uint32(8).uint64(message._uid);
            return writer;
        };

        get_game_data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_game_data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_game_data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_game_data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_game_data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                    return "_uid: integer|Long expected";
            return null;
        };

        get_game_data.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_game_data)
                return object;
            var message = new $root.up.get_game_data();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        get_game_data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        get_game_data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_game_data;
    })();

    up.game_online_num = (function() {

        function game_online_num(properties) {
            this._gid_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        game_online_num.prototype._gid_list = $util.emptyArray;

        game_online_num.create = function create(properties) {
            return new game_online_num(properties);
        };

        game_online_num.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._gid_list != null && message._gid_list.length)
                for (var i = 0; i < message._gid_list.length; ++i)
                    writer.uint32(10).string(message._gid_list[i]);
            return writer;
        };

        game_online_num.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        game_online_num.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.game_online_num();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message._gid_list && message._gid_list.length))
                        message._gid_list = [];
                    message._gid_list.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        game_online_num.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        game_online_num.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._gid_list != null && message.hasOwnProperty("_gid_list")) {
                if (!Array.isArray(message._gid_list))
                    return "_gid_list: array expected";
                for (var i = 0; i < message._gid_list.length; ++i)
                    if (!$util.isString(message._gid_list[i]))
                        return "_gid_list: string[] expected";
            }
            return null;
        };

        game_online_num.fromObject = function fromObject(object) {
            if (object instanceof $root.up.game_online_num)
                return object;
            var message = new $root.up.game_online_num();
            if (object._gid_list) {
                if (!Array.isArray(object._gid_list))
                    throw TypeError(".up.game_online_num._gid_list: array expected");
                message._gid_list = [];
                for (var i = 0; i < object._gid_list.length; ++i)
                    message._gid_list[i] = String(object._gid_list[i]);
            }
            return message;
        };

        game_online_num.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object._gid_list = [];
            if (message._gid_list && message._gid_list.length) {
                object._gid_list = [];
                for (var j = 0; j < message._gid_list.length; ++j)
                    object._gid_list[j] = message._gid_list[j];
            }
            return object;
        };

        game_online_num.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return game_online_num;
    })();

    up.get_friend_list = (function() {

        function get_friend_list(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_friend_list.create = function create(properties) {
            return new get_friend_list(properties);
        };

        get_friend_list.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        get_friend_list.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_friend_list.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_friend_list();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_friend_list.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_friend_list.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        get_friend_list.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_friend_list)
                return object;
            return new $root.up.get_friend_list();
        };

        get_friend_list.toObject = function toObject() {
            return {};
        };

        get_friend_list.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_friend_list;
    })();

    up.add_friend = (function() {

        function add_friend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        add_friend.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        add_friend.create = function create(properties) {
            return new add_friend(properties);
        };

        add_friend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            return writer;
        };

        add_friend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        add_friend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.add_friend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        add_friend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        add_friend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            return null;
        };

        add_friend.fromObject = function fromObject(object) {
            if (object instanceof $root.up.add_friend)
                return object;
            var message = new $root.up.add_friend();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        add_friend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        add_friend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return add_friend;
    })();

    up.agree_add_friend = (function() {

        function agree_add_friend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        agree_add_friend.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        agree_add_friend.prototype._is_agree = false;

        agree_add_friend.create = function create(properties) {
            return new agree_add_friend(properties);
        };

        agree_add_friend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(16).bool(message._is_agree);
            return writer;
        };

        agree_add_friend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        agree_add_friend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.agree_add_friend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._is_agree = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_is_agree"))
                throw $util.ProtocolError("missing required '_is_agree'", { instance: message });
            return message;
        };

        agree_add_friend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        agree_add_friend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (typeof message._is_agree !== "boolean")
                return "_is_agree: boolean expected";
            return null;
        };

        agree_add_friend.fromObject = function fromObject(object) {
            if (object instanceof $root.up.agree_add_friend)
                return object;
            var message = new $root.up.agree_add_friend();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._is_agree != null)
                message._is_agree = Boolean(object._is_agree);
            return message;
        };

        agree_add_friend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._is_agree = false;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._is_agree != null && message.hasOwnProperty("_is_agree"))
                object._is_agree = message._is_agree;
            return object;
        };

        agree_add_friend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return agree_add_friend;
    })();

    up.remove_friend = (function() {

        function remove_friend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        remove_friend.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        remove_friend.create = function create(properties) {
            return new remove_friend(properties);
        };

        remove_friend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            return writer;
        };

        remove_friend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        remove_friend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.remove_friend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        remove_friend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        remove_friend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            return null;
        };

        remove_friend.fromObject = function fromObject(object) {
            if (object instanceof $root.up.remove_friend)
                return object;
            var message = new $root.up.remove_friend();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        remove_friend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        remove_friend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return remove_friend;
    })();

    up.search_friend = (function() {

        function search_friend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        search_friend.prototype._uid_or_name = "";
        search_friend.prototype._page_num = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        search_friend.prototype._page_size = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        search_friend.create = function create(properties) {
            return new search_friend(properties);
        };

        search_friend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._uid_or_name);
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                writer.uint32(16).uint64(message._page_num);
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                writer.uint32(24).uint64(message._page_size);
            return writer;
        };

        search_friend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        search_friend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.search_friend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid_or_name = reader.string();
                    break;
                case 2:
                    message._page_num = reader.uint64();
                    break;
                case 3:
                    message._page_size = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid_or_name"))
                throw $util.ProtocolError("missing required '_uid_or_name'", { instance: message });
            return message;
        };

        search_friend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        search_friend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._uid_or_name))
                return "_uid_or_name: string expected";
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                if (!$util.isInteger(message._page_num) && !(message._page_num && $util.isInteger(message._page_num.low) && $util.isInteger(message._page_num.high)))
                    return "_page_num: integer|Long expected";
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                if (!$util.isInteger(message._page_size) && !(message._page_size && $util.isInteger(message._page_size.low) && $util.isInteger(message._page_size.high)))
                    return "_page_size: integer|Long expected";
            return null;
        };

        search_friend.fromObject = function fromObject(object) {
            if (object instanceof $root.up.search_friend)
                return object;
            var message = new $root.up.search_friend();
            if (object._uid_or_name != null)
                message._uid_or_name = String(object._uid_or_name);
            if (object._page_num != null)
                if ($util.Long)
                    (message._page_num = $util.Long.fromValue(object._page_num)).unsigned = true;
                else if (typeof object._page_num === "string")
                    message._page_num = parseInt(object._page_num, 10);
                else if (typeof object._page_num === "number")
                    message._page_num = object._page_num;
                else if (typeof object._page_num === "object")
                    message._page_num = new $util.LongBits(object._page_num.low >>> 0, object._page_num.high >>> 0).toNumber(true);
            if (object._page_size != null)
                if ($util.Long)
                    (message._page_size = $util.Long.fromValue(object._page_size)).unsigned = true;
                else if (typeof object._page_size === "string")
                    message._page_size = parseInt(object._page_size, 10);
                else if (typeof object._page_size === "number")
                    message._page_size = object._page_size;
                else if (typeof object._page_size === "object")
                    message._page_size = new $util.LongBits(object._page_size.low >>> 0, object._page_size.high >>> 0).toNumber(true);
            return message;
        };

        search_friend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._uid_or_name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._page_num = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._page_num = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._page_size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._page_size = options.longs === String ? "0" : 0;
            }
            if (message._uid_or_name != null && message.hasOwnProperty("_uid_or_name"))
                object._uid_or_name = message._uid_or_name;
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                if (typeof message._page_num === "number")
                    object._page_num = options.longs === String ? String(message._page_num) : message._page_num;
                else
                    object._page_num = options.longs === String ? $util.Long.prototype.toString.call(message._page_num) : options.longs === Number ? new $util.LongBits(message._page_num.low >>> 0, message._page_num.high >>> 0).toNumber(true) : message._page_num;
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                if (typeof message._page_size === "number")
                    object._page_size = options.longs === String ? String(message._page_size) : message._page_size;
                else
                    object._page_size = options.longs === String ? $util.Long.prototype.toString.call(message._page_size) : options.longs === Number ? new $util.LongBits(message._page_size.low >>> 0, message._page_size.high >>> 0).toNumber(true) : message._page_size;
            return object;
        };

        search_friend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return search_friend;
    })();

    up.recommend_friend = (function() {

        function recommend_friend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        recommend_friend.prototype._sex = 0;

        recommend_friend.create = function create(properties) {
            return new recommend_friend(properties);
        };

        recommend_friend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._sex != null && message.hasOwnProperty("_sex"))
                writer.uint32(8).uint32(message._sex);
            return writer;
        };

        recommend_friend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        recommend_friend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.recommend_friend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._sex = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        recommend_friend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        recommend_friend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._sex != null && message.hasOwnProperty("_sex"))
                if (!$util.isInteger(message._sex))
                    return "_sex: integer expected";
            return null;
        };

        recommend_friend.fromObject = function fromObject(object) {
            if (object instanceof $root.up.recommend_friend)
                return object;
            var message = new $root.up.recommend_friend();
            if (object._sex != null)
                message._sex = object._sex >>> 0;
            return message;
        };

        recommend_friend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._sex = 0;
            if (message._sex != null && message.hasOwnProperty("_sex"))
                object._sex = message._sex;
            return object;
        };

        recommend_friend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return recommend_friend;
    })();

    up.get_offline_data = (function() {

        function get_offline_data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_offline_data.prototype._type = 1;

        get_offline_data.create = function create(properties) {
            return new get_offline_data(properties);
        };

        get_offline_data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).int32(message._type);
            return writer;
        };

        get_offline_data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_offline_data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_offline_data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_type"))
                throw $util.ProtocolError("missing required '_type'", { instance: message });
            return message;
        };

        get_offline_data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_offline_data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message._type) {
            default:
                return "_type: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                break;
            }
            return null;
        };

        get_offline_data.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_offline_data)
                return object;
            var message = new $root.up.get_offline_data();
            switch (object._type) {
            case "all":
            case 1:
                message._type = 1;
                break;
            case "chat":
            case 2:
                message._type = 2;
                break;
            case "add_friend":
            case 3:
                message._type = 3;
                break;
            case "agree_add_friend":
            case 4:
                message._type = 4;
                break;
            case "invite_game":
            case 5:
                message._type = 5;
                break;
            case "cancel_invite_game":
            case 6:
                message._type = 6;
                break;
            case "like":
            case 7:
                message._type = 7;
                break;
            }
            return message;
        };

        get_offline_data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._type = options.enums === String ? "all" : 1;
            if (message._type != null && message.hasOwnProperty("_type"))
                object._type = options.enums === String ? $root.up.offline_data_type[message._type] : message._type;
            return object;
        };

        get_offline_data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_offline_data;
    })();

    up.invite_game = (function() {

        function invite_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        invite_game.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        invite_game.prototype._gid = "";
        invite_game.prototype._timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        invite_game.prototype._room_id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        invite_game.create = function create(properties) {
            return new invite_game(properties);
        };

        invite_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(18).string(message._gid);
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                writer.uint32(24).uint64(message._timestamp);
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                writer.uint32(32).uint64(message._room_id);
            return writer;
        };

        invite_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        invite_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.invite_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._gid = reader.string();
                    break;
                case 3:
                    message._timestamp = reader.uint64();
                    break;
                case 4:
                    message._room_id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        invite_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        invite_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (!$util.isInteger(message._timestamp) && !(message._timestamp && $util.isInteger(message._timestamp.low) && $util.isInteger(message._timestamp.high)))
                    return "_timestamp: integer|Long expected";
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (!$util.isInteger(message._room_id) && !(message._room_id && $util.isInteger(message._room_id.low) && $util.isInteger(message._room_id.high)))
                    return "_room_id: integer|Long expected";
            return null;
        };

        invite_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.invite_game)
                return object;
            var message = new $root.up.invite_game();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._timestamp != null)
                if ($util.Long)
                    (message._timestamp = $util.Long.fromValue(object._timestamp)).unsigned = true;
                else if (typeof object._timestamp === "string")
                    message._timestamp = parseInt(object._timestamp, 10);
                else if (typeof object._timestamp === "number")
                    message._timestamp = object._timestamp;
                else if (typeof object._timestamp === "object")
                    message._timestamp = new $util.LongBits(object._timestamp.low >>> 0, object._timestamp.high >>> 0).toNumber(true);
            if (object._room_id != null)
                if ($util.Long)
                    (message._room_id = $util.Long.fromValue(object._room_id)).unsigned = true;
                else if (typeof object._room_id === "string")
                    message._room_id = parseInt(object._room_id, 10);
                else if (typeof object._room_id === "number")
                    message._room_id = object._room_id;
                else if (typeof object._room_id === "object")
                    message._room_id = new $util.LongBits(object._room_id.low >>> 0, object._room_id.high >>> 0).toNumber(true);
            return message;
        };

        invite_game.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._timestamp = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._room_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._room_id = options.longs === String ? "0" : 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (typeof message._timestamp === "number")
                    object._timestamp = options.longs === String ? String(message._timestamp) : message._timestamp;
                else
                    object._timestamp = options.longs === String ? $util.Long.prototype.toString.call(message._timestamp) : options.longs === Number ? new $util.LongBits(message._timestamp.low >>> 0, message._timestamp.high >>> 0).toNumber(true) : message._timestamp;
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (typeof message._room_id === "number")
                    object._room_id = options.longs === String ? String(message._room_id) : message._room_id;
                else
                    object._room_id = options.longs === String ? $util.Long.prototype.toString.call(message._room_id) : options.longs === Number ? new $util.LongBits(message._room_id.low >>> 0, message._room_id.high >>> 0).toNumber(true) : message._room_id;
            return object;
        };

        invite_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return invite_game;
    })();

    up.cancel_invite_game = (function() {

        function cancel_invite_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        cancel_invite_game.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        cancel_invite_game.prototype._gid = "";
        cancel_invite_game.prototype._timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        cancel_invite_game.create = function create(properties) {
            return new cancel_invite_game(properties);
        };

        cancel_invite_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(18).string(message._gid);
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                writer.uint32(24).uint64(message._timestamp);
            return writer;
        };

        cancel_invite_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        cancel_invite_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.cancel_invite_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._gid = reader.string();
                    break;
                case 3:
                    message._timestamp = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        cancel_invite_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        cancel_invite_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (!$util.isInteger(message._timestamp) && !(message._timestamp && $util.isInteger(message._timestamp.low) && $util.isInteger(message._timestamp.high)))
                    return "_timestamp: integer|Long expected";
            return null;
        };

        cancel_invite_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.cancel_invite_game)
                return object;
            var message = new $root.up.cancel_invite_game();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._timestamp != null)
                if ($util.Long)
                    (message._timestamp = $util.Long.fromValue(object._timestamp)).unsigned = true;
                else if (typeof object._timestamp === "string")
                    message._timestamp = parseInt(object._timestamp, 10);
                else if (typeof object._timestamp === "number")
                    message._timestamp = object._timestamp;
                else if (typeof object._timestamp === "object")
                    message._timestamp = new $util.LongBits(object._timestamp.low >>> 0, object._timestamp.high >>> 0).toNumber(true);
            return message;
        };

        cancel_invite_game.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._timestamp = options.longs === String ? "0" : 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (typeof message._timestamp === "number")
                    object._timestamp = options.longs === String ? String(message._timestamp) : message._timestamp;
                else
                    object._timestamp = options.longs === String ? $util.Long.prototype.toString.call(message._timestamp) : options.longs === Number ? new $util.LongBits(message._timestamp.low >>> 0, message._timestamp.high >>> 0).toNumber(true) : message._timestamp;
            return object;
        };

        cancel_invite_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return cancel_invite_game;
    })();

    up.agree_invite_game = (function() {

        function agree_invite_game(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        agree_invite_game.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        agree_invite_game.prototype._gid = "";
        agree_invite_game.prototype._agree = false;
        agree_invite_game.prototype._room_id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        agree_invite_game.prototype._timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        agree_invite_game.prototype._server_timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        agree_invite_game.create = function create(properties) {
            return new agree_invite_game(properties);
        };

        agree_invite_game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            writer.uint32(18).string(message._gid);
            writer.uint32(24).bool(message._agree);
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                writer.uint32(32).uint64(message._room_id);
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                writer.uint32(40).uint64(message._timestamp);
            if (message._server_timestamp != null && message.hasOwnProperty("_server_timestamp"))
                writer.uint32(48).uint64(message._server_timestamp);
            return writer;
        };

        agree_invite_game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        agree_invite_game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.agree_invite_game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._gid = reader.string();
                    break;
                case 3:
                    message._agree = reader.bool();
                    break;
                case 4:
                    message._room_id = reader.uint64();
                    break;
                case 5:
                    message._timestamp = reader.uint64();
                    break;
                case 6:
                    message._server_timestamp = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            if (!message.hasOwnProperty("_agree"))
                throw $util.ProtocolError("missing required '_agree'", { instance: message });
            return message;
        };

        agree_invite_game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        agree_invite_game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (typeof message._agree !== "boolean")
                return "_agree: boolean expected";
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (!$util.isInteger(message._room_id) && !(message._room_id && $util.isInteger(message._room_id.low) && $util.isInteger(message._room_id.high)))
                    return "_room_id: integer|Long expected";
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (!$util.isInteger(message._timestamp) && !(message._timestamp && $util.isInteger(message._timestamp.low) && $util.isInteger(message._timestamp.high)))
                    return "_timestamp: integer|Long expected";
            if (message._server_timestamp != null && message.hasOwnProperty("_server_timestamp"))
                if (!$util.isInteger(message._server_timestamp) && !(message._server_timestamp && $util.isInteger(message._server_timestamp.low) && $util.isInteger(message._server_timestamp.high)))
                    return "_server_timestamp: integer|Long expected";
            return null;
        };

        agree_invite_game.fromObject = function fromObject(object) {
            if (object instanceof $root.up.agree_invite_game)
                return object;
            var message = new $root.up.agree_invite_game();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._agree != null)
                message._agree = Boolean(object._agree);
            if (object._room_id != null)
                if ($util.Long)
                    (message._room_id = $util.Long.fromValue(object._room_id)).unsigned = true;
                else if (typeof object._room_id === "string")
                    message._room_id = parseInt(object._room_id, 10);
                else if (typeof object._room_id === "number")
                    message._room_id = object._room_id;
                else if (typeof object._room_id === "object")
                    message._room_id = new $util.LongBits(object._room_id.low >>> 0, object._room_id.high >>> 0).toNumber(true);
            if (object._timestamp != null)
                if ($util.Long)
                    (message._timestamp = $util.Long.fromValue(object._timestamp)).unsigned = true;
                else if (typeof object._timestamp === "string")
                    message._timestamp = parseInt(object._timestamp, 10);
                else if (typeof object._timestamp === "number")
                    message._timestamp = object._timestamp;
                else if (typeof object._timestamp === "object")
                    message._timestamp = new $util.LongBits(object._timestamp.low >>> 0, object._timestamp.high >>> 0).toNumber(true);
            if (object._server_timestamp != null)
                if ($util.Long)
                    (message._server_timestamp = $util.Long.fromValue(object._server_timestamp)).unsigned = true;
                else if (typeof object._server_timestamp === "string")
                    message._server_timestamp = parseInt(object._server_timestamp, 10);
                else if (typeof object._server_timestamp === "number")
                    message._server_timestamp = object._server_timestamp;
                else if (typeof object._server_timestamp === "object")
                    message._server_timestamp = new $util.LongBits(object._server_timestamp.low >>> 0, object._server_timestamp.high >>> 0).toNumber(true);
            return message;
        };

        agree_invite_game.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._gid = "";
                object._agree = false;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._room_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._room_id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._timestamp = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._server_timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._server_timestamp = options.longs === String ? "0" : 0;
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._agree != null && message.hasOwnProperty("_agree"))
                object._agree = message._agree;
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (typeof message._room_id === "number")
                    object._room_id = options.longs === String ? String(message._room_id) : message._room_id;
                else
                    object._room_id = options.longs === String ? $util.Long.prototype.toString.call(message._room_id) : options.longs === Number ? new $util.LongBits(message._room_id.low >>> 0, message._room_id.high >>> 0).toNumber(true) : message._room_id;
            if (message._timestamp != null && message.hasOwnProperty("_timestamp"))
                if (typeof message._timestamp === "number")
                    object._timestamp = options.longs === String ? String(message._timestamp) : message._timestamp;
                else
                    object._timestamp = options.longs === String ? $util.Long.prototype.toString.call(message._timestamp) : options.longs === Number ? new $util.LongBits(message._timestamp.low >>> 0, message._timestamp.high >>> 0).toNumber(true) : message._timestamp;
            if (message._server_timestamp != null && message.hasOwnProperty("_server_timestamp"))
                if (typeof message._server_timestamp === "number")
                    object._server_timestamp = options.longs === String ? String(message._server_timestamp) : message._server_timestamp;
                else
                    object._server_timestamp = options.longs === String ? $util.Long.prototype.toString.call(message._server_timestamp) : options.longs === Number ? new $util.LongBits(message._server_timestamp.low >>> 0, message._server_timestamp.high >>> 0).toNumber(true) : message._server_timestamp;
            return object;
        };

        agree_invite_game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return agree_invite_game;
    })();

    up.feedback = (function() {

        function feedback(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        feedback.prototype._type = 1;
        feedback.prototype._content = "";
        feedback.prototype._screenshot = "";
        feedback.prototype._tel = "";
        feedback.prototype._time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        feedback.create = function create(properties) {
            return new feedback(properties);
        };

        feedback.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).int32(message._type);
            writer.uint32(18).string(message._content);
            if (message._screenshot != null && message.hasOwnProperty("_screenshot"))
                writer.uint32(26).string(message._screenshot);
            if (message._tel != null && message.hasOwnProperty("_tel"))
                writer.uint32(34).string(message._tel);
            if (message._time != null && message.hasOwnProperty("_time"))
                writer.uint32(40).uint64(message._time);
            return writer;
        };

        feedback.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        feedback.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.feedback();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._type = reader.int32();
                    break;
                case 2:
                    message._content = reader.string();
                    break;
                case 3:
                    message._screenshot = reader.string();
                    break;
                case 4:
                    message._tel = reader.string();
                    break;
                case 5:
                    message._time = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_type"))
                throw $util.ProtocolError("missing required '_type'", { instance: message });
            if (!message.hasOwnProperty("_content"))
                throw $util.ProtocolError("missing required '_content'", { instance: message });
            return message;
        };

        feedback.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        feedback.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message._type) {
            default:
                return "_type: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                break;
            }
            if (!$util.isString(message._content))
                return "_content: string expected";
            if (message._screenshot != null && message.hasOwnProperty("_screenshot"))
                if (!$util.isString(message._screenshot))
                    return "_screenshot: string expected";
            if (message._tel != null && message.hasOwnProperty("_tel"))
                if (!$util.isString(message._tel))
                    return "_tel: string expected";
            if (message._time != null && message.hasOwnProperty("_time"))
                if (!$util.isInteger(message._time) && !(message._time && $util.isInteger(message._time.low) && $util.isInteger(message._time.high)))
                    return "_time: integer|Long expected";
            return null;
        };

        feedback.fromObject = function fromObject(object) {
            if (object instanceof $root.up.feedback)
                return object;
            var message = new $root.up.feedback();
            switch (object._type) {
            case "login":
            case 1:
                message._type = 1;
                break;
            case "game":
            case 2:
                message._type = 2;
                break;
            case "personal_data":
            case 3:
                message._type = 3;
                break;
            case "chat_frame":
            case 4:
                message._type = 4;
                break;
            case "other_question_or_suggestion":
            case 5:
                message._type = 5;
                break;
            case "report_or_complaint":
            case 6:
                message._type = 6;
                break;
            }
            if (object._content != null)
                message._content = String(object._content);
            if (object._screenshot != null)
                message._screenshot = String(object._screenshot);
            if (object._tel != null)
                message._tel = String(object._tel);
            if (object._time != null)
                if ($util.Long)
                    (message._time = $util.Long.fromValue(object._time)).unsigned = true;
                else if (typeof object._time === "string")
                    message._time = parseInt(object._time, 10);
                else if (typeof object._time === "number")
                    message._time = object._time;
                else if (typeof object._time === "object")
                    message._time = new $util.LongBits(object._time.low >>> 0, object._time.high >>> 0).toNumber(true);
            return message;
        };

        feedback.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._type = options.enums === String ? "login" : 1;
                object._content = "";
                object._screenshot = "";
                object._tel = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._time = options.longs === String ? "0" : 0;
            }
            if (message._type != null && message.hasOwnProperty("_type"))
                object._type = options.enums === String ? $root.up.feedback_type[message._type] : message._type;
            if (message._content != null && message.hasOwnProperty("_content"))
                object._content = message._content;
            if (message._screenshot != null && message.hasOwnProperty("_screenshot"))
                object._screenshot = message._screenshot;
            if (message._tel != null && message.hasOwnProperty("_tel"))
                object._tel = message._tel;
            if (message._time != null && message.hasOwnProperty("_time"))
                if (typeof message._time === "number")
                    object._time = options.longs === String ? String(message._time) : message._time;
                else
                    object._time = options.longs === String ? $util.Long.prototype.toString.call(message._time) : options.longs === Number ? new $util.LongBits(message._time.low >>> 0, message._time.high >>> 0).toNumber(true) : message._time;
            return object;
        };

        feedback.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return feedback;
    })();

    up.add_black = (function() {

        function add_black(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        add_black.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        add_black.prototype._time = "";

        add_black.create = function create(properties) {
            return new add_black(properties);
        };

        add_black.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            if (message._time != null && message.hasOwnProperty("_time"))
                writer.uint32(18).string(message._time);
            return writer;
        };

        add_black.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        add_black.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.add_black();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                case 2:
                    message._time = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        add_black.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        add_black.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            if (message._time != null && message.hasOwnProperty("_time"))
                if (!$util.isString(message._time))
                    return "_time: string expected";
            return null;
        };

        add_black.fromObject = function fromObject(object) {
            if (object instanceof $root.up.add_black)
                return object;
            var message = new $root.up.add_black();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            if (object._time != null)
                message._time = String(object._time);
            return message;
        };

        add_black.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
                object._time = "";
            }
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            if (message._time != null && message.hasOwnProperty("_time"))
                object._time = message._time;
            return object;
        };

        add_black.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return add_black;
    })();

    up.cancel_black = (function() {

        function cancel_black(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        cancel_black.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        cancel_black.create = function create(properties) {
            return new cancel_black(properties);
        };

        cancel_black.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            return writer;
        };

        cancel_black.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        cancel_black.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.cancel_black();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        cancel_black.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        cancel_black.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            return null;
        };

        cancel_black.fromObject = function fromObject(object) {
            if (object instanceof $root.up.cancel_black)
                return object;
            var message = new $root.up.cancel_black();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        cancel_black.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        cancel_black.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return cancel_black;
    })();

    up.get_black_list = (function() {

        function get_black_list(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_black_list.create = function create(properties) {
            return new get_black_list(properties);
        };

        get_black_list.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        get_black_list.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_black_list.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_black_list();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_black_list.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_black_list.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        get_black_list.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_black_list)
                return object;
            return new $root.up.get_black_list();
        };

        get_black_list.toObject = function toObject() {
            return {};
        };

        get_black_list.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_black_list;
    })();

    up.get_game_word_rank = (function() {

        function get_game_word_rank(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_game_word_rank.prototype._gid = "";
        get_game_word_rank.prototype._page_num = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        get_game_word_rank.prototype._page_size = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        get_game_word_rank.create = function create(properties) {
            return new get_game_word_rank(properties);
        };

        get_game_word_rank.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                writer.uint32(16).uint64(message._page_num);
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                writer.uint32(24).uint64(message._page_size);
            return writer;
        };

        get_game_word_rank.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_game_word_rank.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_game_word_rank();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._page_num = reader.uint64();
                    break;
                case 3:
                    message._page_size = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        get_game_word_rank.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_game_word_rank.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                if (!$util.isInteger(message._page_num) && !(message._page_num && $util.isInteger(message._page_num.low) && $util.isInteger(message._page_num.high)))
                    return "_page_num: integer|Long expected";
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                if (!$util.isInteger(message._page_size) && !(message._page_size && $util.isInteger(message._page_size.low) && $util.isInteger(message._page_size.high)))
                    return "_page_size: integer|Long expected";
            return null;
        };

        get_game_word_rank.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_game_word_rank)
                return object;
            var message = new $root.up.get_game_word_rank();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._page_num != null)
                if ($util.Long)
                    (message._page_num = $util.Long.fromValue(object._page_num)).unsigned = true;
                else if (typeof object._page_num === "string")
                    message._page_num = parseInt(object._page_num, 10);
                else if (typeof object._page_num === "number")
                    message._page_num = object._page_num;
                else if (typeof object._page_num === "object")
                    message._page_num = new $util.LongBits(object._page_num.low >>> 0, object._page_num.high >>> 0).toNumber(true);
            if (object._page_size != null)
                if ($util.Long)
                    (message._page_size = $util.Long.fromValue(object._page_size)).unsigned = true;
                else if (typeof object._page_size === "string")
                    message._page_size = parseInt(object._page_size, 10);
                else if (typeof object._page_size === "number")
                    message._page_size = object._page_size;
                else if (typeof object._page_size === "object")
                    message._page_size = new $util.LongBits(object._page_size.low >>> 0, object._page_size.high >>> 0).toNumber(true);
            return message;
        };

        get_game_word_rank.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._page_num = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._page_num = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._page_size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._page_size = options.longs === String ? "0" : 0;
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                if (typeof message._page_num === "number")
                    object._page_num = options.longs === String ? String(message._page_num) : message._page_num;
                else
                    object._page_num = options.longs === String ? $util.Long.prototype.toString.call(message._page_num) : options.longs === Number ? new $util.LongBits(message._page_num.low >>> 0, message._page_num.high >>> 0).toNumber(true) : message._page_num;
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                if (typeof message._page_size === "number")
                    object._page_size = options.longs === String ? String(message._page_size) : message._page_size;
                else
                    object._page_size = options.longs === String ? $util.Long.prototype.toString.call(message._page_size) : options.longs === Number ? new $util.LongBits(message._page_size.low >>> 0, message._page_size.high >>> 0).toNumber(true) : message._page_size;
            return object;
        };

        get_game_word_rank.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_game_word_rank;
    })();

    up.get_game_friend_rank = (function() {

        function get_game_friend_rank(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_game_friend_rank.prototype._gid = "";

        get_game_friend_rank.create = function create(properties) {
            return new get_game_friend_rank(properties);
        };

        get_game_friend_rank.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            return writer;
        };

        get_game_friend_rank.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_game_friend_rank.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_game_friend_rank();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        get_game_friend_rank.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_game_friend_rank.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            return null;
        };

        get_game_friend_rank.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_game_friend_rank)
                return object;
            var message = new $root.up.get_game_friend_rank();
            if (object._gid != null)
                message._gid = String(object._gid);
            return message;
        };

        get_game_friend_rank.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._gid = "";
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            return object;
        };

        get_game_friend_rank.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_game_friend_rank;
    })();

    up.update_rank_game_data = (function() {

        function update_rank_game_data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        update_rank_game_data.prototype._gid = "";
        update_rank_game_data.prototype._score = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        update_rank_game_data.prototype._level = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        update_rank_game_data.create = function create(properties) {
            return new update_rank_game_data(properties);
        };

        update_rank_game_data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            if (message._score != null && message.hasOwnProperty("_score"))
                writer.uint32(16).uint64(message._score);
            if (message._level != null && message.hasOwnProperty("_level"))
                writer.uint32(24).uint64(message._level);
            return writer;
        };

        update_rank_game_data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        update_rank_game_data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.update_rank_game_data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._score = reader.uint64();
                    break;
                case 3:
                    message._level = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        update_rank_game_data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        update_rank_game_data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (message._score != null && message.hasOwnProperty("_score"))
                if (!$util.isInteger(message._score) && !(message._score && $util.isInteger(message._score.low) && $util.isInteger(message._score.high)))
                    return "_score: integer|Long expected";
            if (message._level != null && message.hasOwnProperty("_level"))
                if (!$util.isInteger(message._level) && !(message._level && $util.isInteger(message._level.low) && $util.isInteger(message._level.high)))
                    return "_level: integer|Long expected";
            return null;
        };

        update_rank_game_data.fromObject = function fromObject(object) {
            if (object instanceof $root.up.update_rank_game_data)
                return object;
            var message = new $root.up.update_rank_game_data();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._score != null)
                if ($util.Long)
                    (message._score = $util.Long.fromValue(object._score)).unsigned = true;
                else if (typeof object._score === "string")
                    message._score = parseInt(object._score, 10);
                else if (typeof object._score === "number")
                    message._score = object._score;
                else if (typeof object._score === "object")
                    message._score = new $util.LongBits(object._score.low >>> 0, object._score.high >>> 0).toNumber(true);
            if (object._level != null)
                if ($util.Long)
                    (message._level = $util.Long.fromValue(object._level)).unsigned = true;
                else if (typeof object._level === "string")
                    message._level = parseInt(object._level, 10);
                else if (typeof object._level === "number")
                    message._level = object._level;
                else if (typeof object._level === "object")
                    message._level = new $util.LongBits(object._level.low >>> 0, object._level.high >>> 0).toNumber(true);
            return message;
        };

        update_rank_game_data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._score = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._score = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._level = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._level = options.longs === String ? "0" : 0;
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._score != null && message.hasOwnProperty("_score"))
                if (typeof message._score === "number")
                    object._score = options.longs === String ? String(message._score) : message._score;
                else
                    object._score = options.longs === String ? $util.Long.prototype.toString.call(message._score) : options.longs === Number ? new $util.LongBits(message._score.low >>> 0, message._score.high >>> 0).toNumber(true) : message._score;
            if (message._level != null && message.hasOwnProperty("_level"))
                if (typeof message._level === "number")
                    object._level = options.longs === String ? String(message._level) : message._level;
                else
                    object._level = options.longs === String ? $util.Long.prototype.toString.call(message._level) : options.longs === Number ? new $util.LongBits(message._level.low >>> 0, message._level.high >>> 0).toNumber(true) : message._level;
            return object;
        };

        update_rank_game_data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return update_rank_game_data;
    })();

    up.like = (function() {

        function like(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        like.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        like.create = function create(properties) {
            return new like(properties);
        };

        like.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            return writer;
        };

        like.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        like.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.like();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        like.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        like.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            return null;
        };

        like.fromObject = function fromObject(object) {
            if (object instanceof $root.up.like)
                return object;
            var message = new $root.up.like();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        like.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        like.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return like;
    })();

    up.voice_single_chat = (function() {

        function voice_single_chat(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        voice_single_chat.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        voice_single_chat.create = function create(properties) {
            return new voice_single_chat(properties);
        };

        voice_single_chat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            return writer;
        };

        voice_single_chat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        voice_single_chat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.voice_single_chat();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        voice_single_chat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        voice_single_chat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            return null;
        };

        voice_single_chat.fromObject = function fromObject(object) {
            if (object instanceof $root.up.voice_single_chat)
                return object;
            var message = new $root.up.voice_single_chat();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        voice_single_chat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        voice_single_chat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return voice_single_chat;
    })();

    up.voice_multiple_chat = (function() {

        function voice_multiple_chat(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        voice_multiple_chat.prototype._room_id = "";

        voice_multiple_chat.create = function create(properties) {
            return new voice_multiple_chat(properties);
        };

        voice_multiple_chat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._room_id);
            return writer;
        };

        voice_multiple_chat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        voice_multiple_chat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.voice_multiple_chat();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._room_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_room_id"))
                throw $util.ProtocolError("missing required '_room_id'", { instance: message });
            return message;
        };

        voice_multiple_chat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        voice_multiple_chat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._room_id))
                return "_room_id: string expected";
            return null;
        };

        voice_multiple_chat.fromObject = function fromObject(object) {
            if (object instanceof $root.up.voice_multiple_chat)
                return object;
            var message = new $root.up.voice_multiple_chat();
            if (object._room_id != null)
                message._room_id = String(object._room_id);
            return message;
        };

        voice_multiple_chat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._room_id = "";
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                object._room_id = message._room_id;
            return object;
        };

        voice_multiple_chat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return voice_multiple_chat;
    })();

    up.update_access_token = (function() {

        function update_access_token(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        update_access_token.prototype._channel_name = "";

        update_access_token.create = function create(properties) {
            return new update_access_token(properties);
        };

        update_access_token.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._channel_name);
            return writer;
        };

        update_access_token.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        update_access_token.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.update_access_token();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._channel_name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_channel_name"))
                throw $util.ProtocolError("missing required '_channel_name'", { instance: message });
            return message;
        };

        update_access_token.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        update_access_token.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._channel_name))
                return "_channel_name: string expected";
            return null;
        };

        update_access_token.fromObject = function fromObject(object) {
            if (object instanceof $root.up.update_access_token)
                return object;
            var message = new $root.up.update_access_token();
            if (object._channel_name != null)
                message._channel_name = String(object._channel_name);
            return message;
        };

        update_access_token.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._channel_name = "";
            if (message._channel_name != null && message.hasOwnProperty("_channel_name"))
                object._channel_name = message._channel_name;
            return object;
        };

        update_access_token.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return update_access_token;
    })();

    up.get_user_achievement = (function() {

        function get_user_achievement(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_user_achievement.prototype._uid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        get_user_achievement.create = function create(properties) {
            return new get_user_achievement(properties);
        };

        get_user_achievement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(8).uint64(message._uid);
            return writer;
        };

        get_user_achievement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_user_achievement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_user_achievement();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._uid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_uid"))
                throw $util.ProtocolError("missing required '_uid'", { instance: message });
            return message;
        };

        get_user_achievement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_user_achievement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message._uid) && !(message._uid && $util.isInteger(message._uid.low) && $util.isInteger(message._uid.high)))
                return "_uid: integer|Long expected";
            return null;
        };

        get_user_achievement.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_user_achievement)
                return object;
            var message = new $root.up.get_user_achievement();
            if (object._uid != null)
                if ($util.Long)
                    (message._uid = $util.Long.fromValue(object._uid)).unsigned = true;
                else if (typeof object._uid === "string")
                    message._uid = parseInt(object._uid, 10);
                else if (typeof object._uid === "number")
                    message._uid = object._uid;
                else if (typeof object._uid === "object")
                    message._uid = new $util.LongBits(object._uid.low >>> 0, object._uid.high >>> 0).toNumber(true);
            return message;
        };

        get_user_achievement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._uid = options.longs === String ? "0" : 0;
            if (message._uid != null && message.hasOwnProperty("_uid"))
                if (typeof message._uid === "number")
                    object._uid = options.longs === String ? String(message._uid) : message._uid;
                else
                    object._uid = options.longs === String ? $util.Long.prototype.toString.call(message._uid) : options.longs === Number ? new $util.LongBits(message._uid.low >>> 0, message._uid.high >>> 0).toNumber(true) : message._uid;
            return object;
        };

        get_user_achievement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_user_achievement;
    })();

    up.commodity_trading = (function() {

        function commodity_trading(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        commodity_trading.prototype._id = "";
        commodity_trading.prototype._cost_type = 0;
        commodity_trading.prototype._cost_num = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        commodity_trading.create = function create(properties) {
            return new commodity_trading(properties);
        };

        commodity_trading.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._id);
            writer.uint32(16).uint32(message._cost_type);
            writer.uint32(24).uint64(message._cost_num);
            return writer;
        };

        commodity_trading.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        commodity_trading.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.commodity_trading();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._id = reader.string();
                    break;
                case 2:
                    message._cost_type = reader.uint32();
                    break;
                case 3:
                    message._cost_num = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_id"))
                throw $util.ProtocolError("missing required '_id'", { instance: message });
            if (!message.hasOwnProperty("_cost_type"))
                throw $util.ProtocolError("missing required '_cost_type'", { instance: message });
            if (!message.hasOwnProperty("_cost_num"))
                throw $util.ProtocolError("missing required '_cost_num'", { instance: message });
            return message;
        };

        commodity_trading.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        commodity_trading.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._id))
                return "_id: string expected";
            if (!$util.isInteger(message._cost_type))
                return "_cost_type: integer expected";
            if (!$util.isInteger(message._cost_num) && !(message._cost_num && $util.isInteger(message._cost_num.low) && $util.isInteger(message._cost_num.high)))
                return "_cost_num: integer|Long expected";
            return null;
        };

        commodity_trading.fromObject = function fromObject(object) {
            if (object instanceof $root.up.commodity_trading)
                return object;
            var message = new $root.up.commodity_trading();
            if (object._id != null)
                message._id = String(object._id);
            if (object._cost_type != null)
                message._cost_type = object._cost_type >>> 0;
            if (object._cost_num != null)
                if ($util.Long)
                    (message._cost_num = $util.Long.fromValue(object._cost_num)).unsigned = true;
                else if (typeof object._cost_num === "string")
                    message._cost_num = parseInt(object._cost_num, 10);
                else if (typeof object._cost_num === "number")
                    message._cost_num = object._cost_num;
                else if (typeof object._cost_num === "object")
                    message._cost_num = new $util.LongBits(object._cost_num.low >>> 0, object._cost_num.high >>> 0).toNumber(true);
            return message;
        };

        commodity_trading.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._id = "";
                object._cost_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._cost_num = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._cost_num = options.longs === String ? "0" : 0;
            }
            if (message._id != null && message.hasOwnProperty("_id"))
                object._id = message._id;
            if (message._cost_type != null && message.hasOwnProperty("_cost_type"))
                object._cost_type = message._cost_type;
            if (message._cost_num != null && message.hasOwnProperty("_cost_num"))
                if (typeof message._cost_num === "number")
                    object._cost_num = options.longs === String ? String(message._cost_num) : message._cost_num;
                else
                    object._cost_num = options.longs === String ? $util.Long.prototype.toString.call(message._cost_num) : options.longs === Number ? new $util.LongBits(message._cost_num.low >>> 0, message._cost_num.high >>> 0).toNumber(true) : message._cost_num;
            return object;
        };

        commodity_trading.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return commodity_trading;
    })();

    up.get_user_commodity = (function() {

        function get_user_commodity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_user_commodity.prototype._name = "";

        get_user_commodity.create = function create(properties) {
            return new get_user_commodity(properties);
        };

        get_user_commodity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._name != null && message.hasOwnProperty("_name"))
                writer.uint32(10).string(message._name);
            return writer;
        };

        get_user_commodity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_user_commodity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_user_commodity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_user_commodity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_user_commodity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._name != null && message.hasOwnProperty("_name"))
                if (!$util.isString(message._name))
                    return "_name: string expected";
            return null;
        };

        get_user_commodity.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_user_commodity)
                return object;
            var message = new $root.up.get_user_commodity();
            if (object._name != null)
                message._name = String(object._name);
            return message;
        };

        get_user_commodity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._name = "";
            if (message._name != null && message.hasOwnProperty("_name"))
                object._name = message._name;
            return object;
        };

        get_user_commodity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_user_commodity;
    })();

    up.set_user_commodity = (function() {

        function set_user_commodity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        set_user_commodity.prototype._id = "";
        set_user_commodity.prototype._name = "";

        set_user_commodity.create = function create(properties) {
            return new set_user_commodity(properties);
        };

        set_user_commodity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._id);
            writer.uint32(18).string(message._name);
            return writer;
        };

        set_user_commodity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        set_user_commodity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.set_user_commodity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._id = reader.string();
                    break;
                case 2:
                    message._name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_id"))
                throw $util.ProtocolError("missing required '_id'", { instance: message });
            if (!message.hasOwnProperty("_name"))
                throw $util.ProtocolError("missing required '_name'", { instance: message });
            return message;
        };

        set_user_commodity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        set_user_commodity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._id))
                return "_id: string expected";
            if (!$util.isString(message._name))
                return "_name: string expected";
            return null;
        };

        set_user_commodity.fromObject = function fromObject(object) {
            if (object instanceof $root.up.set_user_commodity)
                return object;
            var message = new $root.up.set_user_commodity();
            if (object._id != null)
                message._id = String(object._id);
            if (object._name != null)
                message._name = String(object._name);
            return message;
        };

        set_user_commodity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._id = "";
                object._name = "";
            }
            if (message._id != null && message.hasOwnProperty("_id"))
                object._id = message._id;
            if (message._name != null && message.hasOwnProperty("_name"))
                object._name = message._name;
            return object;
        };

        set_user_commodity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return set_user_commodity;
    })();

    up.get_like_list = (function() {

        function get_like_list(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_like_list.create = function create(properties) {
            return new get_like_list(properties);
        };

        get_like_list.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        get_like_list.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_like_list.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_like_list();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        get_like_list.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_like_list.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        get_like_list.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_like_list)
                return object;
            return new $root.up.get_like_list();
        };

        get_like_list.toObject = function toObject() {
            return {};
        };

        get_like_list.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_like_list;
    })();

    up.head_portrait_set = (function() {

        function head_portrait_set(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        head_portrait_set.create = function create(properties) {
            return new head_portrait_set(properties);
        };

        head_portrait_set.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        head_portrait_set.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        head_portrait_set.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.head_portrait_set();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        head_portrait_set.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        head_portrait_set.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        head_portrait_set.fromObject = function fromObject(object) {
            if (object instanceof $root.up.head_portrait_set)
                return object;
            return new $root.up.head_portrait_set();
        };

        head_portrait_set.toObject = function toObject() {
            return {};
        };

        head_portrait_set.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return head_portrait_set;
    })();

    up.live_img_add = (function() {

        function live_img_add(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        live_img_add.create = function create(properties) {
            return new live_img_add(properties);
        };

        live_img_add.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        live_img_add.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        live_img_add.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.live_img_add();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        live_img_add.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        live_img_add.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        live_img_add.fromObject = function fromObject(object) {
            if (object instanceof $root.up.live_img_add)
                return object;
            return new $root.up.live_img_add();
        };

        live_img_add.toObject = function toObject() {
            return {};
        };

        live_img_add.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return live_img_add;
    })();

    up.live_img_delete = (function() {

        function live_img_delete(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        live_img_delete.prototype._index = 0;

        live_img_delete.create = function create(properties) {
            return new live_img_delete(properties);
        };

        live_img_delete.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._index != null && message.hasOwnProperty("_index"))
                writer.uint32(8).uint32(message._index);
            return writer;
        };

        live_img_delete.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        live_img_delete.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.live_img_delete();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._index = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        live_img_delete.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        live_img_delete.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._index != null && message.hasOwnProperty("_index"))
                if (!$util.isInteger(message._index))
                    return "_index: integer expected";
            return null;
        };

        live_img_delete.fromObject = function fromObject(object) {
            if (object instanceof $root.up.live_img_delete)
                return object;
            var message = new $root.up.live_img_delete();
            if (object._index != null)
                message._index = object._index >>> 0;
            return message;
        };

        live_img_delete.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._index = 0;
            if (message._index != null && message.hasOwnProperty("_index"))
                object._index = message._index;
            return object;
        };

        live_img_delete.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return live_img_delete;
    })();

    up.live_img_replace = (function() {

        function live_img_replace(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        live_img_replace.prototype._index = 0;

        live_img_replace.create = function create(properties) {
            return new live_img_replace(properties);
        };

        live_img_replace.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._index != null && message.hasOwnProperty("_index"))
                writer.uint32(8).uint32(message._index);
            return writer;
        };

        live_img_replace.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        live_img_replace.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.live_img_replace();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._index = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        live_img_replace.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        live_img_replace.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._index != null && message.hasOwnProperty("_index"))
                if (!$util.isInteger(message._index))
                    return "_index: integer expected";
            return null;
        };

        live_img_replace.fromObject = function fromObject(object) {
            if (object instanceof $root.up.live_img_replace)
                return object;
            var message = new $root.up.live_img_replace();
            if (object._index != null)
                message._index = object._index >>> 0;
            return message;
        };

        live_img_replace.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._index = 0;
            if (message._index != null && message.hasOwnProperty("_index"))
                object._index = message._index;
            return object;
        };

        live_img_replace.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return live_img_replace;
    })();

    up.live_img_move = (function() {

        function live_img_move(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        live_img_move.prototype._old_index = 0;
        live_img_move.prototype._new_index = 0;

        live_img_move.create = function create(properties) {
            return new live_img_move(properties);
        };

        live_img_move.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._old_index != null && message.hasOwnProperty("_old_index"))
                writer.uint32(8).uint32(message._old_index);
            if (message._new_index != null && message.hasOwnProperty("_new_index"))
                writer.uint32(16).uint32(message._new_index);
            return writer;
        };

        live_img_move.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        live_img_move.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.live_img_move();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._old_index = reader.uint32();
                    break;
                case 2:
                    message._new_index = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        live_img_move.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        live_img_move.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._old_index != null && message.hasOwnProperty("_old_index"))
                if (!$util.isInteger(message._old_index))
                    return "_old_index: integer expected";
            if (message._new_index != null && message.hasOwnProperty("_new_index"))
                if (!$util.isInteger(message._new_index))
                    return "_new_index: integer expected";
            return null;
        };

        live_img_move.fromObject = function fromObject(object) {
            if (object instanceof $root.up.live_img_move)
                return object;
            var message = new $root.up.live_img_move();
            if (object._old_index != null)
                message._old_index = object._old_index >>> 0;
            if (object._new_index != null)
                message._new_index = object._new_index >>> 0;
            return message;
        };

        live_img_move.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._old_index = 0;
                object._new_index = 0;
            }
            if (message._old_index != null && message.hasOwnProperty("_old_index"))
                object._old_index = message._old_index;
            if (message._new_index != null && message.hasOwnProperty("_new_index"))
                object._new_index = message._new_index;
            return object;
        };

        live_img_move.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return live_img_move;
    })();

    up.account_binding = (function() {

        function account_binding(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        account_binding.prototype._new_login_type = 1;
        account_binding.prototype._new_name = "";
        account_binding.prototype._new_password = "";

        account_binding.create = function create(properties) {
            return new account_binding(properties);
        };

        account_binding.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._new_login_type != null && message.hasOwnProperty("_new_login_type"))
                writer.uint32(8).int32(message._new_login_type);
            if (message._new_name != null && message.hasOwnProperty("_new_name"))
                writer.uint32(18).string(message._new_name);
            if (message._new_password != null && message.hasOwnProperty("_new_password"))
                writer.uint32(26).string(message._new_password);
            return writer;
        };

        account_binding.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        account_binding.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.account_binding();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._new_login_type = reader.int32();
                    break;
                case 2:
                    message._new_name = reader.string();
                    break;
                case 3:
                    message._new_password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        account_binding.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        account_binding.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._new_login_type != null && message.hasOwnProperty("_new_login_type"))
                switch (message._new_login_type) {
                default:
                    return "_new_login_type: enum value expected";
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message._new_name != null && message.hasOwnProperty("_new_name"))
                if (!$util.isString(message._new_name))
                    return "_new_name: string expected";
            if (message._new_password != null && message.hasOwnProperty("_new_password"))
                if (!$util.isString(message._new_password))
                    return "_new_password: string expected";
            return null;
        };

        account_binding.fromObject = function fromObject(object) {
            if (object instanceof $root.up.account_binding)
                return object;
            var message = new $root.up.account_binding();
            switch (object._new_login_type) {
            case "default_login":
            case 1:
                message._new_login_type = 1;
                break;
            case "facebook_login":
            case 2:
                message._new_login_type = 2;
                break;
            case "guest_login":
            case 3:
                message._new_login_type = 3;
                break;
            case "token_login":
            case 4:
                message._new_login_type = 4;
                break;
            case "mobile_login":
            case 5:
                message._new_login_type = 5;
                break;
            case "google_login":
            case 6:
                message._new_login_type = 6;
                break;
            }
            if (object._new_name != null)
                message._new_name = String(object._new_name);
            if (object._new_password != null)
                message._new_password = String(object._new_password);
            return message;
        };

        account_binding.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._new_login_type = options.enums === String ? "default_login" : 1;
                object._new_name = "";
                object._new_password = "";
            }
            if (message._new_login_type != null && message.hasOwnProperty("_new_login_type"))
                object._new_login_type = options.enums === String ? $root.up.login_type_enum[message._new_login_type] : message._new_login_type;
            if (message._new_name != null && message.hasOwnProperty("_new_name"))
                object._new_name = message._new_name;
            if (message._new_password != null && message.hasOwnProperty("_new_password"))
                object._new_password = message._new_password;
            return object;
        };

        account_binding.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return account_binding;
    })();

    up.create_game_room = (function() {

        function create_game_room(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        create_game_room.prototype._gid = "";

        create_game_room.create = function create(properties) {
            return new create_game_room(properties);
        };

        create_game_room.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._gid != null && message.hasOwnProperty("_gid"))
                writer.uint32(10).string(message._gid);
            return writer;
        };

        create_game_room.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        create_game_room.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.create_game_room();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        create_game_room.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        create_game_room.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._gid != null && message.hasOwnProperty("_gid"))
                if (!$util.isString(message._gid))
                    return "_gid: string expected";
            return null;
        };

        create_game_room.fromObject = function fromObject(object) {
            if (object instanceof $root.up.create_game_room)
                return object;
            var message = new $root.up.create_game_room();
            if (object._gid != null)
                message._gid = String(object._gid);
            return message;
        };

        create_game_room.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object._gid = "";
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            return object;
        };

        create_game_room.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return create_game_room;
    })();

    up.update_game_room_info = (function() {

        function update_game_room_info(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        update_game_room_info.create = function create(properties) {
            return new update_game_room_info(properties);
        };

        update_game_room_info.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        update_game_room_info.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        update_game_room_info.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.update_game_room_info();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        update_game_room_info.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        update_game_room_info.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        update_game_room_info.fromObject = function fromObject(object) {
            if (object instanceof $root.up.update_game_room_info)
                return object;
            return new $root.up.update_game_room_info();
        };

        update_game_room_info.toObject = function toObject() {
            return {};
        };

        update_game_room_info.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return update_game_room_info;
    })();

    up.leave_game_room = (function() {

        function leave_game_room(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        leave_game_room.prototype._gid = "";
        leave_game_room.prototype._room_id = "";

        leave_game_room.create = function create(properties) {
            return new leave_game_room(properties);
        };

        leave_game_room.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message._gid != null && message.hasOwnProperty("_gid"))
                writer.uint32(10).string(message._gid);
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                writer.uint32(18).string(message._room_id);
            return writer;
        };

        leave_game_room.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        leave_game_room.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.leave_game_room();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._room_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        leave_game_room.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        leave_game_room.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message._gid != null && message.hasOwnProperty("_gid"))
                if (!$util.isString(message._gid))
                    return "_gid: string expected";
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                if (!$util.isString(message._room_id))
                    return "_room_id: string expected";
            return null;
        };

        leave_game_room.fromObject = function fromObject(object) {
            if (object instanceof $root.up.leave_game_room)
                return object;
            var message = new $root.up.leave_game_room();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._room_id != null)
                message._room_id = String(object._room_id);
            return message;
        };

        leave_game_room.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                object._room_id = "";
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._room_id != null && message.hasOwnProperty("_room_id"))
                object._room_id = message._room_id;
            return object;
        };

        leave_game_room.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return leave_game_room;
    })();

    up.get_game_today_rank = (function() {

        function get_game_today_rank(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        get_game_today_rank.prototype._gid = "";
        get_game_today_rank.prototype._page_num = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        get_game_today_rank.prototype._page_size = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        get_game_today_rank.create = function create(properties) {
            return new get_game_today_rank(properties);
        };

        get_game_today_rank.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message._gid);
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                writer.uint32(16).uint64(message._page_num);
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                writer.uint32(24).uint64(message._page_size);
            return writer;
        };

        get_game_today_rank.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        get_game_today_rank.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.up.get_game_today_rank();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message._gid = reader.string();
                    break;
                case 2:
                    message._page_num = reader.uint64();
                    break;
                case 3:
                    message._page_size = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("_gid"))
                throw $util.ProtocolError("missing required '_gid'", { instance: message });
            return message;
        };

        get_game_today_rank.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        get_game_today_rank.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message._gid))
                return "_gid: string expected";
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                if (!$util.isInteger(message._page_num) && !(message._page_num && $util.isInteger(message._page_num.low) && $util.isInteger(message._page_num.high)))
                    return "_page_num: integer|Long expected";
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                if (!$util.isInteger(message._page_size) && !(message._page_size && $util.isInteger(message._page_size.low) && $util.isInteger(message._page_size.high)))
                    return "_page_size: integer|Long expected";
            return null;
        };

        get_game_today_rank.fromObject = function fromObject(object) {
            if (object instanceof $root.up.get_game_today_rank)
                return object;
            var message = new $root.up.get_game_today_rank();
            if (object._gid != null)
                message._gid = String(object._gid);
            if (object._page_num != null)
                if ($util.Long)
                    (message._page_num = $util.Long.fromValue(object._page_num)).unsigned = true;
                else if (typeof object._page_num === "string")
                    message._page_num = parseInt(object._page_num, 10);
                else if (typeof object._page_num === "number")
                    message._page_num = object._page_num;
                else if (typeof object._page_num === "object")
                    message._page_num = new $util.LongBits(object._page_num.low >>> 0, object._page_num.high >>> 0).toNumber(true);
            if (object._page_size != null)
                if ($util.Long)
                    (message._page_size = $util.Long.fromValue(object._page_size)).unsigned = true;
                else if (typeof object._page_size === "string")
                    message._page_size = parseInt(object._page_size, 10);
                else if (typeof object._page_size === "number")
                    message._page_size = object._page_size;
                else if (typeof object._page_size === "object")
                    message._page_size = new $util.LongBits(object._page_size.low >>> 0, object._page_size.high >>> 0).toNumber(true);
            return message;
        };

        get_game_today_rank.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object._gid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._page_num = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._page_num = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object._page_size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object._page_size = options.longs === String ? "0" : 0;
            }
            if (message._gid != null && message.hasOwnProperty("_gid"))
                object._gid = message._gid;
            if (message._page_num != null && message.hasOwnProperty("_page_num"))
                if (typeof message._page_num === "number")
                    object._page_num = options.longs === String ? String(message._page_num) : message._page_num;
                else
                    object._page_num = options.longs === String ? $util.Long.prototype.toString.call(message._page_num) : options.longs === Number ? new $util.LongBits(message._page_num.low >>> 0, message._page_num.high >>> 0).toNumber(true) : message._page_num;
            if (message._page_size != null && message.hasOwnProperty("_page_size"))
                if (typeof message._page_size === "number")
                    object._page_size = options.longs === String ? String(message._page_size) : message._page_size;
                else
                    object._page_size = options.longs === String ? $util.Long.prototype.toString.call(message._page_size) : options.longs === Number ? new $util.LongBits(message._page_size.low >>> 0, message._page_size.high >>> 0).toNumber(true) : message._page_size;
            return object;
        };

        get_game_today_rank.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return get_game_today_rank;
    })();

    return up;
})();

module.exports = $root;