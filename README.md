# Math.vc
Support for _vector calculus_ in JavaScript.  

The following methods are accessible through the `Math.vc` namespace:

- `add(A,B)`
- `sub(A,B)`
- `mul(A,k)`
- `dotProduct(A,B)`
- `crossProduct(A,B)`
- `outerProduct(A,B)`
- `kroneckerProduct(A,B)`
- `angle(A,B)`
- `projection(A,B)`
- `arePerpendicular(A,B)`
- `areParallel(A,B)`
- `length(V)`
- `normalize(V)`

Plus the following differential methods:

- `gradient(f)`
- `divergence(F)`
- `curl(F)`
- `laplacian(f)`
- `vectorLaplacian(F)`

## Overview

### `add(A,B)`

Adds two vectors.

$$
A + B
$$

### `sub(A,B)`

Subtracts two vectors.

$$
A - B
$$

### `mul(A,k)`

Multiplies a vector by a scalar value.

$$
kA
$$

### `dotProduct(A,B)`

The dot product of two vectors.

$$
A \cdot B
$$

### `crossProduct(A,B)`

The cross product of two vectors.

$$
A \times B
$$

### `outerProduct(A,B)`

The outer product of two vectors.

$$
A \otimes B = \begin{bmatrix}
 a_1b_1 & a_1b_2 & \cdots
 \\
 a_2b_1 & a_2b_2 & \cdots
 \\
 \vdots & \vdots & \ddots
\end{bmatrix}
$$

### `kroneckerProduct(A,B)`

The Kronecker product of two vectors.

$$
A \otimes B = [
 a_1B, ..., a_nB
]
$$

### `angle(A,B)`

Returns an angle between two vectors.

$$
\arccos\left(
  \frac{A \cdot B}{|A| |B|}
\right)
$$

### `projection(A,B)`

Projects vector A on vector B.

$$
\text{proj}_B \ A = \frac{A \cdot B}{|B|^2} B
$$

### `arePerpendicular(A,B)`

Checks if two vectors are perpendicular.

$$
A \perp B \iff A \cdot B = 0
$$

### `areParallel(A,B)`

Checks if two vectors are parallel.

$$
A \parallel B \iff A \times B = [0,0,0]
$$

### `length(V)`

Returns a length of a vector.

$$
|V| = \sqrt{a_1 + \cdots + a_n}
$$

### `normalize(V)`

Performs normalization of a vector.

$$
\frac{V}{|V|}
$$

## Overview of Differential Methods

### `gradient(f)`

- input: $f: \Bbb{R}^3 \to \Bbb{R}$
- output: $\Bbb{R}^3$

$$
\text{grad} \ f = \nabla f = \left[
  \frac{\partial f}{\partial x},
  \frac{\partial f}{\partial y},
  \frac{\partial f}{\partial z}
\right]^{\intercal}
$$

### `divergence(F)`

- input: $F: \Bbb{R}^3 \to \Bbb{R}^3$
- output: $\Bbb{R}$

$$
\text{div} \ F = \nabla \cdot F =
\frac{\partial F_x}{\partial x} +
\frac{\partial F_y}{\partial y} +
\frac{\partial F_z}{\partial z}
$$

### `curl(F)`

- input: $F: \Bbb{R}^3 \to \Bbb{R}^3$
- output: $\Bbb{R}^3$

$$
\text{curl} \ F = \nabla \times F = \begin{vmatrix}
  \hat{i} & \hat{j} & \hat{k}
  \\
  \ 
  \\
  \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z}
  \\
  \ 
  \\
  F_x & F_y & F_z
\end{vmatrix}
$$

### `laplacian(f)`

- input: $f: \Bbb{R}^3 \to \Bbb{R}$
- output: $\Bbb{R}$

$$
\Delta f = \nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}
$$

### `vectorLaplacian(F)`

- input: $F: \Bbb{R}^3 \to \Bbb{R}^3$
- output: $\Bbb{R}^3$

$$
\Delta F = \nabla^2 F = (\Delta F_1, \Delta F_2, \Delta F_3)
$$

## Input/Output

- a scalar field $f: \Bbb{R}^3 \to \Bbb{R}$ receives three arguments ($x,y,z$) and return a scalar value
- a vector field $\Bbb{R}^3$ is an object with the following three properties: `dx`, `dy` and `dz`

### Example 1

To get the following gradient:

$$
\nabla \ f, \text{ for } f(x,y,z) = x^2+y^2+z^2
$$

we shall write:

```
const f = (x,y,z) => x*x + y*y + z*z;
const grad = Math.vc.gradient(f);

grad(1,2,3)
// {dx: 2, dy: 4, dz: 6 }
```

### Example 2

To get the following curl:

$$
\text{curl} \ F, \text{ for } F(x,y,z) = (-y,x,0)
$$

we shall write:

```
const F = (x,y,z) => ({
  dx: -y,
  dy: x,
  dz: 0
});
const curl = Math.vc.curl(F);

curl(1,1,1)
// {dx: 0, dy: 0, dz: 2}
```
