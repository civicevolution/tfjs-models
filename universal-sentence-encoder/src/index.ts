console.log('### v7 Modified universal-sentence-encoder');
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

import * as tf from '@tensorflow/tfjs-core';
import * as tfn from '@tensorflow/tfjs-node';
import * as fs from 'fs';
const fsp = fs.promises;

import {loadTokenizer, Tokenizer} from './tokenizer';
import {loadQnA} from './use_qna';

export {version} from './version';

declare interface ModelInputs extends tf.NamedTensorMap {
  indices: tf.Tensor;
  values: tf.Tensor;
}

interface LoadConfig {
  modelUrl?: string;
  vocabUrl?: string;
}

export async function load(config?: LoadConfig) {
  console.log(
      '### v7 Modified universal-sentence-encoder to load from local files - 1'
  );
  const use = new UniversalSentenceEncoder();
  await use.load(config);
  return use;
}

export class UniversalSentenceEncoder {
  private model: tfn.GraphModel;
  private tokenizer: Tokenizer;

  async loadModelFromFile() {
    console.log('loadModelFromFile');

    const lgmp = tfn.loadGraphModel(
        'file://use_model/model.json',
        { fromTFHub: false }
    );
    console.log('check lgmp');
    const lgm = await lgmp;
    console.log('check lgm');
    return lgm;
  }
  async loadVocabularyFromFile() {
    console.log('loadVocabularyFromFile');
    const vocab = await fsp.readFile('./use_model_vocabulary/vocab.json');
    return JSON.parse(vocab.toString('utf8'));
  }
  async load(config: LoadConfig = {}) {
    console.log(
        '### v7 Modified universal-sentence-encoder to load from local files - 2'
    );
    const [model, vocabulary] = await Promise.all([
      this.loadModelFromFile(),
      this.loadVocabularyFromFile()
    ]);
    console.log(
        'tensorflow/universal-sentence-encoder loaded from local files'
    );
    this.model = model;
    this.tokenizer = new Tokenizer(vocabulary);
  }

  /**
   *
   * Returns a 2D Tensor of shape [input.length, 512] that contains the
   * Universal Sentence Encoder embeddings for each input.
   *
   * @param inputs A string or an array of strings to embed.
   */
  async embed(inputs: string[]|string): Promise<tf.Tensor2D> {
    if (typeof inputs === 'string') {
      inputs = [inputs];
    }

    const encodings = inputs.map(d => this.tokenizer.encode(d));

    const indicesArr =
        encodings.map((arr, i) => arr.map((d, index) => [i, index]));

    let flattenedIndicesArr: Array<[number, number]> = [];
    for (let i = 0; i < indicesArr.length; i++) {
      flattenedIndicesArr =
          flattenedIndicesArr.concat(indicesArr[i] as Array<[number, number]>);
    }

    const indices = tf.tensor2d(
        flattenedIndicesArr, [flattenedIndicesArr.length, 2], 'int32');
    const values = tf.tensor1d(tf.util.flatten(encodings) as number[], 'int32');

    const modelInputs: ModelInputs = {indices, values};

    const embeddings = await this.model.executeAsync(modelInputs);
    indices.dispose();
    values.dispose();

    return embeddings as tf.Tensor2D;
  }
}

export {Tokenizer};
export {loadTokenizer};
export {loadQnA};
