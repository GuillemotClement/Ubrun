<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude('var')
    ->notPath([
      'config/bundles.php',
      'config/reference.php',
    ])
;

return (new PhpCsFixer\Config())
    ->setRules([
      '@Symfony' => true,
      '@PSR12' => true,
      'indentation_type' => true,
      'method_argument_space' => [
        'on_multiline' => 'ensure_fully_multiline',
      ],
      'function_declaration' => [
        'closure_function_spacing' => 'one',
      ],
      'trailing_comma_in_multiline' => true,
      'array_syntax' => ['syntax' => 'short'],
    ])
    ->setIndent('  ')
    ->setFinder($finder)
;
