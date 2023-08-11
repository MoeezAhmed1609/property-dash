class Node {
    constructor(character, frequency, left, right) {
      this.character = character;
      this.frequency = frequency;
      this.left = left;
      this.right = right;
    }
  
    isLeaf() {
      return !this.left && !this.right;
    }
  }
  
  function buildFrequencyTable(text) {
    const frequencyTable = new Map();
  
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (frequencyTable.has(char)) {
        frequencyTable.set(char, frequencyTable.get(char) + 1);
      } else {
        frequencyTable.set(char, 1);
      }
    }
  
    return frequencyTable;
  }
  
  function buildHuffmanTree(frequencyTable) {
    const queue = [];
  
    frequencyTable.forEach((frequency, character) => {
      const node = new Node(character, frequency);
      queue.push(node);
    });
  
    while (queue.length > 1) {
      queue.sort((a, b) => a.frequency - b.frequency);
  
      const leftNode = queue.shift();
      const rightNode = queue.shift();
  
      const mergedNode = new Node(
        null,
        leftNode.frequency + rightNode.frequency,
        leftNode,
        rightNode
      );
  
      queue.push(mergedNode);
    }
  
    return queue.shift();
  }
  
  function buildCodeTable(root) {
    const codeTable = new Map();
  
    function traverse(node, code) {
      if (node.isLeaf()) {
        codeTable.set(node.character, code);
      } else {
        traverse(node.left, code + '0');
        traverse(node.right, code + '1');
      }
    }
  
    traverse(root, '');
  
    return codeTable;
  }
  
  export function compressText(text) {
    const frequencyTable = buildFrequencyTable(text);
    const huffmanTree = buildHuffmanTree(frequencyTable);
    const codeTable = buildCodeTable(huffmanTree);
  
    let compressedText = '';
  
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      compressedText += codeTable.get(char);
    }
  
    return compressedText;
  }
  
    export  function decompressText(compressedText, huffmanTree) {
    let decompressedText = '';
    let currentNode = huffmanTree;
  
    for (let i = 0; i < compressedText.length; i++) {
      const bit = compressedText[i];
  
      if (bit === '0') {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
  
      if (currentNode.isLeaf()) {
        decompressedText += currentNode.character;
        currentNode = huffmanTree;
      }
    }
  
    return decompressedText;
  }
  
  // Example usage
//   const originalText = 'this is a sample text to compress';
//   const compressedText = compressText(originalText);
//   console.log('Compressed text:', compressedText);
  
//   const huffmanTree = buildHuffmanTree(buildFrequencyTable(originalText));
//   const decompressedText = decompressText(compressedText, huffmanTree);
//   console.log('Decompressed text:', decompressedText);
  