# Math.vc
Support for _vector calculus_ in JavaScript.  
The following methods are accessible through the `Math.vc` namespace:

- `gradient(f)`
- `divergence(F)`
- `curl(F)`
- `laplacian(f)`
- `vectorLaplacian(F)`

## Input/Output

- a scalar field $f: \Bbb{R}^3 \to \Bbb{R}$ receives three arguments ($x,y,z$) and return a scalar value
- a vector field $\Bbb{R}^3$ is an object with the following three properties: `dx`, `dy` and `dz`

For example to get the following gradient:

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

Or, to get the following curl:

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
