/**
    * @license
    * Copyright 2021 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-core'), require('fs'), require('@tensorflow/tfjs-converter')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-core', 'fs', '@tensorflow/tfjs-converter'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.use = {}, global.tf, global.fs$1, global.tf));
}(this, (function (exports, tf$1, fs$1, tfconv) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @license
     * Copyright 2018 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    // Register all kernels.
    require("./register_all_kernels");
    var tf = require("@tensorflow/tfjs");
    var path = require("path");
    var callbacks_1 = require("./callbacks");
    var file_system_1 = require("./io/file_system");
    var nodeIo = require("./io/index");
    var nodejs_kernel_backend_1 = require("./nodejs_kernel_backend");
    var nodeVersion = require("./version");
    // tslint:disable-next-line:no-require-imports
    var binary = require('node-pre-gyp');
    var bindingPath = binary.find(path.resolve(path.join(__dirname, '/../package.json')));
    // Check if the node native addon module exists.
    // tslint:disable-next-line:no-require-imports
    var fs = require('fs');
    if (!fs.existsSync(bindingPath)) {
        throw new Error("The Node.js native addon module (tfjs_binding.node) can not " +
            "be found at path: " + String(bindingPath) + ". \nPlease run command " +
            "'npm rebuild @tensorflow/tfjs-node" +
            (String(bindingPath).indexOf('tfjs-node-gpu') > 0 ? "-gpu" : "") +
            " --build-addon-from-source' to " +
            "rebuild the native addon module. \nIf you have problem with building " +
            "the addon module, please check " +
            "https://github.com/tensorflow/tfjs/blob/master/tfjs-node/" +
            "WINDOWS_TROUBLESHOOTING.md or file an issue.");
    }
    // tslint:disable-next-line:no-require-imports
    var bindings = require(bindingPath);
    // Merge version and io namespaces.
    exports.version = __assign({}, tf.version, { 'tfjs-node': nodeVersion.version });
    exports.io = __assign({}, tf.io, nodeIo);
    // Export all union package symbols
    __export(require("@tensorflow/tfjs"));
    __export(require("./node"));
    // tslint:disable-next-line:no-require-imports
    var pjson = require('../package.json');
    // Side effects for default initialization of Node backend.
    tf.registerBackend('tensorflow', function () {
        return new nodejs_kernel_backend_1.NodeJSKernelBackend(bindings, pjson.name);
    }, 3 /* priority */);
    var success = tf.setBackend('tensorflow');
    if (!success) {
        throw new Error("Could not initialize TensorFlow backend.");
    }
    // Register the model saving and loading handlers for the 'file://' URL scheme.
    tf.io.registerLoadRouter(file_system_1.nodeFileSystemRouter);
    tf.io.registerSaveRouter(file_system_1.nodeFileSystemRouter);
    // Register the ProgbarLogger for Model.fit() at verbosity level 1.
    tf.registerCallbackConstructor(1, callbacks_1.ProgbarLogger);

    var tfn = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    // unicode-aware iteration
    var stringToChars = function (input) {
        var symbols = [];
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var symbol = input_1[_i];
            symbols.push(symbol);
        }
        return symbols;
    };

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var TrieNode = /** @class */ (function () {
        function TrieNode() {
            this.parent = null;
            this.children = {};
            this.end = false;
            this.word = [[], 0, 0];
        }
        return TrieNode;
    }());
    var Trie = /** @class */ (function () {
        function Trie() {
            this.root = new TrieNode();
        }
        /**
         * Inserts a token into the trie.
         */
        Trie.prototype.insert = function (word, score, index) {
            var node = this.root;
            var symbols = stringToChars(word);
            for (var i = 0; i < symbols.length; i++) {
                if (!node.children[symbols[i]]) {
                    node.children[symbols[i]] = new TrieNode();
                    node.children[symbols[i]].parent = node;
                    node.children[symbols[i]].word[0] = node.word[0].concat(symbols[i]);
                }
                node = node.children[symbols[i]];
                if (i === symbols.length - 1) {
                    node.end = true;
                    node.word[1] = score;
                    node.word[2] = index;
                }
            }
        };
        /**
         * Returns an array of all tokens starting with ss.
         *
         * @param ss The prefix to match on.
         */
        Trie.prototype.commonPrefixSearch = function (ss) {
            var output = [];
            var node = this.root.children[ss[0]];
            for (var i = 0; i < ss.length && node; i++) {
                if (node.end) {
                    output.push(node.word);
                }
                node = node.children[ss[i + 1]];
            }
            if (!output.length) {
                output.push([[ss[0]], 0, 0]);
            }
            return output;
        };
        return Trie;
    }());

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var separator = '\u2581'; // This is the unicode character 'lower one eighth block'.
    function processInput(str) {
        var normalized = str.normalize('NFKC');
        return normalized.length > 0 ?
            separator + normalized.replace(/ /g, separator) :
            normalized;
    }
    // The first tokens are reserved for unk, control symbols, and user-defined
    // symbols.
    var RESERVED_SYMBOLS_COUNT$1 = 6;
    var Tokenizer = /** @class */ (function () {
        function Tokenizer(vocabulary, reservedSymbolsCount) {
            if (reservedSymbolsCount === void 0) { reservedSymbolsCount = RESERVED_SYMBOLS_COUNT$1; }
            this.vocabulary = vocabulary;
            this.reservedSymbolsCount = reservedSymbolsCount;
            this.trie = new Trie();
            for (var i = this.reservedSymbolsCount; i < this.vocabulary.length; i++) {
                this.trie.insert(this.vocabulary[i][0], this.vocabulary[i][1], i);
            }
        }
        Tokenizer.prototype.encode = function (input) {
            var nodes = [];
            var words = [];
            var best = [];
            input = processInput(input);
            var symbols = stringToChars(input);
            for (var i = 0; i <= symbols.length; i++) {
                nodes.push({});
                words.push(0);
                best.push(0);
            }
            // Construct the lattice.
            for (var i = 0; i < symbols.length; i++) {
                var matches = this.trie.commonPrefixSearch(symbols.slice(i));
                for (var j = 0; j < matches.length; j++) {
                    var piece = matches[j];
                    var obj = { key: piece[0], score: piece[1], index: piece[2] };
                    var endPos = piece[0].length;
                    if (nodes[i + endPos][i] == null) {
                        nodes[i + endPos][i] = [];
                    }
                    nodes[i + endPos][i].push(obj);
                }
            }
            for (var endPos = 0; endPos <= symbols.length; endPos++) {
                for (var startPos in nodes[endPos]) {
                    var arr = nodes[endPos][startPos];
                    for (var j = 0; j < arr.length; j++) {
                        var word = arr[j];
                        var score = word.score + best[endPos - word.key.length];
                        if (best[endPos] === 0 || score >= best[endPos]) {
                            best[endPos] = score;
                            words[endPos] = arr[j].index;
                        }
                    }
                }
            }
            var results = [];
            // Backward pass.
            var iter = words.length - 1;
            while (iter > 0) {
                results.push(words[iter]);
                iter -= this.vocabulary[words[iter]][0].length;
            }
            // Merge consecutive unks.
            var merged = [];
            var isPreviousUnk = false;
            for (var i = 0; i < results.length; i++) {
                var id = results[i];
                if (!(isPreviousUnk && id === 0)) {
                    merged.push(id);
                }
                isPreviousUnk = id === 0;
            }
            return merged.reverse();
        };
        return Tokenizer;
    }());
    /**
     * Load the Tokenizer for use independently from the UniversalSentenceEncoder.
     *
     * @param pathToVocabulary (optional) Provide a path to the vocabulary file.
     */
    function loadTokenizer(pathToVocabulary) {
        return __awaiter(this, void 0, void 0, function () {
            var vocabulary, tokenizer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadVocabulary(pathToVocabulary)];
                    case 1:
                        vocabulary = _a.sent();
                        tokenizer = new Tokenizer(vocabulary);
                        return [2 /*return*/, tokenizer];
                }
            });
        });
    }
    /**
     * Load a vocabulary for the Tokenizer.
     *
     * @param pathToVocabulary Defaults to the path to the 8k vocabulary used by the
     * UniversalSentenceEncoder.
     */
    function loadVocabulary(pathToVocabulary) {
        return __awaiter(this, void 0, void 0, function () {
            var vocabulary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tf$1.util.fetch(pathToVocabulary)];
                    case 1:
                        vocabulary = _a.sent();
                        return [2 /*return*/, vocabulary.json()];
                }
            });
        });
    }

    /** @license See the LICENSE file. */
    // This code is auto-generated, do not modify this file!
    var version = '1.3.2';

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the 'License');
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an 'AS IS' BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var BASE_PATH = 'https://tfhub.dev/google/tfjs-model/universal-sentence-encoder-qa-ondevice/1';
    // Index in the vocab file that needs to be skipped.
    var SKIP_VALUES = [0, 1, 2];
    // Offset value for skipped vocab index.
    var OFFSET = 3;
    // Input tensor size limit.
    var INPUT_LIMIT = 192;
    // Model node name for query.
    var QUERY_NODE_NAME = 'input_inp_text';
    // Model node name for query.
    var RESPONSE_CONTEXT_NODE_NAME = 'input_res_context';
    // Model node name for response.
    var RESPONSE_NODE_NAME = 'input_res_text';
    // Model node name for response result.
    var RESPONSE_RESULT_NODE_NAME = 'Final/EncodeResult/mul';
    // Model node name for query result.
    var QUERY_RESULT_NODE_NAME = 'Final/EncodeQuery/mul';
    // Reserved symbol count for tokenizer.
    var RESERVED_SYMBOLS_COUNT = 3;
    // Value for token padding
    var TOKEN_PADDING = 2;
    // Start value for each token
    var TOKEN_START_VALUE = 1;
    function loadQnA() {
        return __awaiter(this, void 0, void 0, function () {
            var use;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        use = new UniversalSentenceEncoderQnA();
                        return [4 /*yield*/, use.load()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, use];
                }
            });
        });
    }
    var UniversalSentenceEncoderQnA = /** @class */ (function () {
        function UniversalSentenceEncoderQnA() {
        }
        UniversalSentenceEncoderQnA.prototype.loadModel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, tfconv.loadGraphModel(BASE_PATH, { fromTFHub: true })];
                });
            });
        };
        UniversalSentenceEncoderQnA.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, model, vocabulary;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.loadModel(),
                                loadVocabulary(BASE_PATH + "/vocab.json?tfjs-format=file")
                            ])];
                        case 1:
                            _a = _b.sent(), model = _a[0], vocabulary = _a[1];
                            this.model = model;
                            this.tokenizer = new Tokenizer(vocabulary, RESERVED_SYMBOLS_COUNT);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Returns a map of queryEmbedding and responseEmbedding
         *
         * @param input the ModelInput that contains queries and answers.
         */
        UniversalSentenceEncoderQnA.prototype.embed = function (input) {
            var _this = this;
            var embeddings = tf$1.tidy(function () {
                var queryEncoding = _this.tokenizeStrings(input.queries, INPUT_LIMIT);
                var responseEncoding = _this.tokenizeStrings(input.responses, INPUT_LIMIT);
                if (input.contexts != null) {
                    if (input.contexts.length !== input.responses.length) {
                        throw new Error('The length of response strings ' +
                            'and context strings need to match.');
                    }
                }
                var contexts = input.contexts || [];
                if (input.contexts == null) {
                    contexts.length = input.responses.length;
                    contexts.fill('');
                }
                var contextEncoding = _this.tokenizeStrings(contexts, INPUT_LIMIT);
                var modelInputs = {};
                modelInputs[QUERY_NODE_NAME] = queryEncoding;
                modelInputs[RESPONSE_NODE_NAME] = responseEncoding;
                modelInputs[RESPONSE_CONTEXT_NODE_NAME] = contextEncoding;
                return _this.model.execute(modelInputs, [QUERY_RESULT_NODE_NAME, RESPONSE_RESULT_NODE_NAME]);
            });
            var queryEmbedding = embeddings[0];
            var responseEmbedding = embeddings[1];
            return { queryEmbedding: queryEmbedding, responseEmbedding: responseEmbedding };
        };
        UniversalSentenceEncoderQnA.prototype.tokenizeStrings = function (strs, limit) {
            var _this = this;
            var tokens = strs.map(function (s) { return _this.shiftTokens(_this.tokenizer.encode(s), INPUT_LIMIT); });
            return tf$1.tensor2d(tokens, [strs.length, INPUT_LIMIT], 'int32');
        };
        UniversalSentenceEncoderQnA.prototype.shiftTokens = function (tokens, limit) {
            tokens.unshift(TOKEN_START_VALUE);
            for (var index = 0; index < limit; index++) {
                if (index >= tokens.length) {
                    tokens[index] = TOKEN_PADDING;
                }
                else if (!SKIP_VALUES.includes(tokens[index])) {
                    tokens[index] += OFFSET;
                }
            }
            return tokens.slice(0, limit);
        };
        return UniversalSentenceEncoderQnA;
    }());

    console.log('### v7 Modified universal-sentence-encoder');
    var fsp = fs$1.promises;
    function load(config) {
        return __awaiter(this, void 0, void 0, function () {
            var use;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('### v7 Modified universal-sentence-encoder to load from local files - 1');
                        use = new UniversalSentenceEncoder();
                        return [4 /*yield*/, use.load(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, use];
                }
            });
        });
    }
    var UniversalSentenceEncoder = /** @class */ (function () {
        function UniversalSentenceEncoder() {
        }
        UniversalSentenceEncoder.prototype.loadModelFromFile = function () {
            return __awaiter(this, void 0, void 0, function () {
                var lgmp, lgm;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('loadModelFromFile');
                            lgmp = undefined('file://use_model/model.json', { fromTFHub: false });
                            console.log('check lgmp');
                            return [4 /*yield*/, lgmp];
                        case 1:
                            lgm = _a.sent();
                            console.log('check lgm');
                            return [2 /*return*/, lgm];
                    }
                });
            });
        };
        UniversalSentenceEncoder.prototype.loadVocabularyFromFile = function () {
            return __awaiter(this, void 0, void 0, function () {
                var vocab;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('loadVocabularyFromFile');
                            return [4 /*yield*/, fsp.readFile('./use_model_vocabulary/vocab.json')];
                        case 1:
                            vocab = _a.sent();
                            return [2 /*return*/, JSON.parse(vocab.toString('utf8'))];
                    }
                });
            });
        };
        UniversalSentenceEncoder.prototype.load = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, model, vocabulary;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log('### v7 Modified universal-sentence-encoder to load from local files - 2');
                            return [4 /*yield*/, Promise.all([
                                    this.loadModelFromFile(),
                                    this.loadVocabularyFromFile()
                                ])];
                        case 1:
                            _a = _b.sent(), model = _a[0], vocabulary = _a[1];
                            console.log('tensorflow/universal-sentence-encoder loaded from local files');
                            this.model = model;
                            this.tokenizer = new Tokenizer(vocabulary);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Returns a 2D Tensor of shape [input.length, 512] that contains the
         * Universal Sentence Encoder embeddings for each input.
         *
         * @param inputs A string or an array of strings to embed.
         */
        UniversalSentenceEncoder.prototype.embed = function (inputs) {
            return __awaiter(this, void 0, void 0, function () {
                var encodings, indicesArr, flattenedIndicesArr, i, indices, values, modelInputs, embeddings;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof inputs === 'string') {
                                inputs = [inputs];
                            }
                            encodings = inputs.map(function (d) { return _this.tokenizer.encode(d); });
                            indicesArr = encodings.map(function (arr, i) { return arr.map(function (d, index) { return [i, index]; }); });
                            flattenedIndicesArr = [];
                            for (i = 0; i < indicesArr.length; i++) {
                                flattenedIndicesArr =
                                    flattenedIndicesArr.concat(indicesArr[i]);
                            }
                            indices = tf$1.tensor2d(flattenedIndicesArr, [flattenedIndicesArr.length, 2], 'int32');
                            values = tf$1.tensor1d(tf$1.util.flatten(encodings), 'int32');
                            modelInputs = { indices: indices, values: values };
                            return [4 /*yield*/, this.model.executeAsync(modelInputs)];
                        case 1:
                            embeddings = _a.sent();
                            indices.dispose();
                            values.dispose();
                            return [2 /*return*/, embeddings];
                    }
                });
            });
        };
        return UniversalSentenceEncoder;
    }());

    exports.Tokenizer = Tokenizer;
    exports.UniversalSentenceEncoder = UniversalSentenceEncoder;
    exports.load = load;
    exports.loadQnA = loadQnA;
    exports.loadTokenizer = loadTokenizer;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
