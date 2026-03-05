/**
 * ESLint rule: allow-block-imports
 * Enforce import allow and block lists.
 */

import path from 'path';

function checkFilePath(filePath, target) {
    return filePath.includes(`${path.sep}${target}${path.sep}`);
}

function checkImportPath(importPath, target)
{
    return importPath.includes(`/${target}/`) ||
        importPath.startsWith(`${target}/`) ||
        importPath === target;
}

function checkAllowList(importPath, allowList) {
    return allowList.some(allowedPath =>
        checkImportPath(importPath, allowedPath));
}

function checkBlockList(importPath, blockList) {
    return !blockList.some(blockedPath =>
        checkImportPath(importPath, blockedPath));
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce import allow and block lists",
      category: 'Best Practices',
      recommended: false
    },
    schema: [],
    messages: {
      allowBlockImports: "Import allow and block list violation"
    }
  },
  create(context) {
    const filename = context.getFilename();

    const checks = [];

    if (checkFilePath(filename, 'components')) {
        checks.push((importPath) => checkBlockList(importPath, ['views']));
    }

    if (checkFilePath(filename, 'hooks')) {
        checks.push((importPath) => checkBlockList(importPath, ['components', 'icons', 'views']));
    }

    if (checkFilePath(filename, 'models')) {
        checks.push((importPath) => checkBlockList(importPath, ['components', 'hooks', 'icons', 'views']));
    }

    if (checkFilePath(filename, 'utils')) {
        checks.push((importPath) => checkBlockList(importPath, ['components', 'hooks', 'icons', 'models', 'views']));
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;

        if (!checks.every(check => check(importPath))) {
          context.report({
            node,
            messageId: 'allowBlockImports'
          });
        }
      }
    };
  }
};
