+++
title = "Unraveling Python Function Decorators"
date = "2024-09-06"
aliases = ["unraveling-python-function-decorators"]
author = "Bijil Subhash"
tags = ["Python", "Programming"]
draft = true
+++

I learnt about programming when I was in middle school as one of the mandatory subjects. A good chunk of my early exposure into programming had me writing recursive functions for calculating factorials or printing the fibonacci series in C++ and Java. Though I did reasonably well in an academic setting, my abysmal understanding of the underlying concepts as a result of rote learning led me to leaving it all behind until much later in graduate school where I had to start using Python for working with data. Python is a batteries-included beginner friendly language that gave me enough firepower to do exactly what I needed. The relative ease of using Python in practical applications meant that I could get away without ever having to develop a deeper understanding of the powerful features it has to offer. In the interest of closing this gap, I recently embarked on a journey to teach myself some of the advanced topics in Python. In this article, I wanted to unpack one that piqued my interest - function decorators.

<cite>Function decorators in Python fit the general description of decorators in Design Patterns, where a decorator attaches additional responsibilities to an object dynamically[^1]</cite>. In fact, searching for [*Python Function Decorators*](https://www.google.com/search?q=python+function+decorators) on Google yield results with similar flavour, which suggests that function decorators are a construct that can be used to modify functions or methods. I do not come from a functional programming background. As such, I did not find the abstract definitions of a decorator to be intuitive at first. Instead, I studied the examples, read text books, and spent some time building/breaking decorators from scratch. This has helped me put together individual components that powered decorators in Python, some of which I will be sharing in the upcoming sections.

[^1]: [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.oreilly.com/library/view/design-patterns-elements/0201633612/)

Before we get started with decorators, we need to lay the foundation on couple of concepts, starting with scopes. In Python, an object is only available in the region it is created i.e. within its scope. We will go through a series of examples to understand different types of scopes in Python, starting with Example 1 below.

Example 1:

```python
a = 10

def func():
    b = 20
    pass

print("Value of a:", a)
print("Value of b:", b)
```

Output from Example 1:

```bash
Value of a: 10
Traceback (most recent call last):
  File "scopes.py", line 8, in <module>
    print("Value of b:", b)
NameError: name 'b' is not defined
```

The output from Example 1 prints the value for *a* but *b* is undefined. This is because *a* is defined in the global scope and hence accessible globally whereas *b* is defined locally to the function *func* and is therefore not accessible globally. In that case, could we access an object that is available globally inside the function *func*?

Example 2:

```python
a = 10

def func():
    b = 20
    print("Value of a in func:", a)
    print("Value of b in func:", b)
    pass

func()
print("Value of a outside func:", a)
print("Value of b outside func:", b)
```

Output from Example 2:

```bash
Value of a in func: 10
Value of b in func: 20
Value of a outside func: 10
Traceback (most recent call last):
  File "scopes.py", line 11, in <module>
    print("Value of b outside func:", b)
NameError: name 'b' is not defined
```

In Example 2, we were able to print both *a* and *b* inside the *func* but only *a* was accessible outside the *func*, implying that the function can access  objects that are available both in the global and local scope. Would it be possible to access an object that is locally accessible to function in another function?

Example 3:

```python
a = 10

def func_1():
    b = 20
    print("Value of a in func_1:", a)
    print("Value of b in func_1:", b)
    pass

def func_2():
    print("Value of a in func_2:", a)
    print("Value of b in func_2:", b)

func_1()
func_2()
```

Output from Example 3:

```bash
Value of a in func_1: 10
Value of b in func_1: 20
Value of a in func_2: 10
Traceback (most recent call last):
  File "scopes.py", line 14, in <module>
    func_2()
  File "scopes.py", line 11, in func_2
    print("Value of b in func_2:", b)
NameError: name 'b' is not defined
```

Our results in Example 3 shows that we are limited to local scopes within its boundary. So far, we have established the concept of global and local scope. But could we modify behaviour of global objects locally within a function?

Example 4:
```python
a = 10

def func():
    a = 20
    print("Value of a in func:", a)
    pass

func()
print("Value of a outside func :", a)
```

Output from Example 4:

```bash
Value of a in func: 20
Value of a outside func : 10
```

Based on the results from Example 4, though we can assign a new value to *a*, it does not seem to modify the value of *a* in the global scope. However, in Python, we have a *global* keyword that can be used to inform the Python interpreter that *a* is a global object, as shown in Example 5 below.

Example 5:

```python
a = 10

def func():
    global a
    a = 20
    print("Value of a in func:", a)
    pass

func()
print("Value of a outside func :", a)
```

Output from Example 5:

```bash
Value of a in func: 20
Value of a outside func : 20
```

With *global* keyword, we can therefore modify the behaviour of objects in the global scope. There is an interesting edge case here, which brings an important understanding about how scopes are determined during compile time. If we modify the order of declaration of *a* inside the function *func* and print the value of *a* before the declaration as shown in Example 6, we encounter an error which states that local variable *a* was referenced before assignment, implying that during compilation, the scope of each variable is determined in advance. As such, despite declaring *a* globally, inside the function *func*, the interpreter expected *a* to be in the local scope, resulting in the error we see here when *print* was called on an undefined variable.

Example 6:

```python
a = 10

def func():
    print("Value of a in func:", a)
    a = 20
    pass

func()
```

Output from Example 6:

```bash
Traceback (most recent call last):
  File "scopes.py", line 8, in <module>
    func()
  File "scopes.py", line 4, in func
    print("Value of a in func:", a)
UnboundLocalError: local variable 'a' referenced before assignment
```

So far, we have seen the global and local scope. There is a third variant, which goes by the name non-local scope. To understand the non-local scope, let us review a nested function as shown in Example 7.

Example 7:

```python
a = 10

print("Value of a before func:", a)

def func():
    a = 20
    print("Value of a in func and before inner_func:", a)
    def inner_func():
        a = 30
        print("Value of a in inner_func:", a)
    inner_func()
    print("Value of a in func and after inner_func:", a)
    pass

func()
print("Value of a outside func :", a)
```

Output from Example 7:

```bash
Value of a before func: 10
Value of a in func and before inner_func: 20
Value of a in inner_func: 30
Value of a in func and after inner_func: 20
Value of a outside func : 10
```

The output from Example 7 behaves as expected, where *a* defined globally has the value of 10, *a* inside *func* but outside has the value of 20, and *a* inside *inner_func* has a value of 30. *a* within *func* and *inner_func* is in their respective local scope and *a* outside is in the global scope. What if we remove the declaration of *a* inside *inner_func*?

Example 8:

```python
a = 10

print("Value of a before func:", a)

def func():
    a = 20
    print("Value of a in func and before inner_func:", a)
    def inner_func():
        print("Value of a in inner_func:", a)
    inner_func()
    print("Value of a in func and after inner_func:", a)
    pass

func()
print("Value of a outside func :", a)
```

Output from Example 8:

```bash
Value of a before func: 10
Value of a in func and before inner_func: 20
Value of a in inner_func: 20
Value of a in func and after inner_func: 20
Value of a outside func : 10
```

In Example 8, the value of *a* inside *inner_func* is the same as value of *a* inside *func*. But *a* is neither in the global scope nor in local scope inside *inner_func*. Instead, in Python this is called a non-local scope, which is used to define a variable that belongs to the enclosing function's scope. Inside the *inner_func*, you can use the keyword *nonlocal* to modify the behaviour of objects in non-local scope as shown in Example 9, where the value of *a* in *func* was changed to 30 after the execution of *inner_func*.

Example 9:

```python
a = 10

print("Value of a before func:", a)

def func():
    a = 20
    print("Value of a in func and before inner_func:", a)
    def inner_func():
        nonlocal a
        a = 30
        print("Value of a in inner_func:", a)
    inner_func()
    print("Value of a in func and after inner_func:", a)
    pass

func()
print("Value of a outside func :", a)
```

Output from Example 9:

```bash
Value of a before func: 10
Value of a in func and before inner_func: 20
Value of a in inner_func: 30
Value of a in func and after inner_func: 30
Value of a outside func : 10
```


## What does a decorator do?

Let's start with an example decorator and its corresponding output.

```python
from time import time

def logger(fn):
    def inner():
        start = time()
        fn()
        end = time()
        print(f"Executed the {fn.__name__} in {(end - start) * 1000:.3f} milliseconds")
    return inner 

@logger
def test_func():
    print("Function finished running")

if __name__ == "__main__":
    test_func()
```

```bash
>> Function finished running 
>> Executed test_func in 0.062 milliseconds
```

In our example, we are decorating `test_func` with a `logger` function so that when `test_func` is called, we are able to record the time it took to run it  while also executing the contents within `test_func`. A scenario where this might be useful is when you need a logging mechanism for tracking the runtime performance of the functions in an application but does not explicitly want to capture that logic in the functions themselves. In the example provided here, we are using the short form variant, using `@logger` to decorate `test_func`. You can also rewrite the decorator using the long form where `test_func` is passed as a parameter to the `logger` as shown below. In other words, a decorator is simply a callable that takes another function as its parameter.

```python
def logger(fn):
    def inner():
        start = time()
        fn()
        end = time()
        print(f"Executed the {fn.__name__} in {(end - start) * 1000:.3f} milliseconds")
    return inner 

def test_func():
    print("Function finished running")

if __name__ == "__main__":
    logger(test_func)
```

Another observation to note here is that our original `test_func` was modified using a nested-function, achieved by returning `inner` from `logger`. This is a standard implementation pattern for decorators where the goal is to modify the behaviour of the decorated function. Referring to variables (`fn`) that are outside the scope of `inner` is achieved through closures and 