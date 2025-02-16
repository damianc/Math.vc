(function () {

const DELTA = 1e-5;

Math.vc = {
	gradient,
	divergence,
	curl,
	laplacian,
	vectorLaplacian,
	add,
	sub,
	mul,
	dotProduct,
	crossProduct,
	outerProduct,
	kroneckerProduct,
	length,
	normalize,
	angle,
	projection,
	arePerpendicular,
	areParallel
};

function partialDerivative(f, x, y, z, varIndex) {
    const v = [0,0,0];
    v[varIndex] = DELTA;
    
    const [dx,dy,dz] = v;
    const R = f(x+dx, y+dy, z+dz);
    const L = f(x-dx, y-dy, z-dz);
    
    return (R-L)/(2*DELTA);
}

function secondPartialDerivative(f, x, y, z, varIndex) {
    const v = [0,0,0];
    v[varIndex] = DELTA;
    
    const [dx,dy,dz] = v;
    const R = f(x+dx, y+dy, z+dz);
    const C = f(x,y,z);
    const L = f(x-dx, y-dy, z-dz);
    
    return (R-2*C+L)/(DELTA**2);
}

function gradient(f) {
    return (x, y, z) => ({
        dx: partialDerivative(f, x, y, z, 0),
        dy: partialDerivative(f, x, y, z, 1),
        dz: partialDerivative(f, x, y, z, 2)
    });
}

function divergence(F) {
    return (x, y, z) => (
        partialDerivative((x, y, z) => F(x, y, z).dx, x, y, z, 0) +
        partialDerivative((x, y, z) => F(x, y, z).dy, x, y, z, 1) +
        partialDerivative((x, y, z) => F(x, y, z).dz, x, y, z, 2)
    );
}

function curl(F) {
    return (x, y, z) => ({
        dx: partialDerivative((x, y, z) => F(x, y, z).dz, x, y, z, 1) -
            partialDerivative((x, y, z) => F(x, y, z).dy, x, y, z, 2),
        dy: partialDerivative((x, y, z) => F(x, y, z).dx, x, y, z, 2) -
            partialDerivative((x, y, z) => F(x, y, z).dz, x, y, z, 0),
        dz: partialDerivative((x, y, z) => F(x, y, z).dy, x, y, z, 0) -
            partialDerivative((x, y, z) => F(x, y, z).dx, x, y, z, 1)
    });
}

function laplacian(f) {
    return (x, y, z) => (
        secondPartialDerivative(f, x, y, z, 0) +
        secondPartialDerivative(f, x, y, z, 1) +
        secondPartialDerivative(f, x, y, z, 2)
    );
}

function vectorLaplacian(F) {
    const divF = divergence(F);
    const curlF = curl(F);
    return (x, y, z) => {
        const gradDivF = gradient(divF);
        const curlCurlF = curl(curlF);
        const gradDivF_value = gradDivF(x, y, z);
        const curlCurlF_value = curlCurlF(x, y, z);
        return {
            dx: gradDivF_value.dx - curlCurlF_value.dx,
            dy: gradDivF_value.dy - curlCurlF_value.dy,
            dz: gradDivF_value.dz - curlCurlF_value.dz
        };
    };
}

function _sum(arr) {
	return arr.reduce((acc,curr) => {
		return acc+curr;
	});
}

function add(A,B) {
	return A.map((a,i) => a + B[i]);
}

function sub(A,B) {
	return A.map((a,i) => a - B[i]);
}

function mul(A,k) {
	return A.map(a => k*a);
}

function dotProduct(A,B) {
	const prods = A.map((a,i) => a * B[i]);
	return _sum(prods);
}

function crossProduct(A,B) {
	const [a1,a2,a3] = A;
	const [b1,b2,b3] = B;
	return [
	 a2*b3-a3*b2,
	 a3*b1-a1*b3,
	 a1*b2-a2*b1
	];
}

function outerProduct(A,B) {
	return A.map(a => {
		return mul(B,a)
	});
}

function kroneckerProduct(A,B) {
 if ('flat' in Array.prototype) {
		return outerProduct(A,B).flat();
	} else {
	 return A.reduce((acc,curr) => {
		 return [...acc, ...mul(B,curr)];
	 }, []);
	}
}

function length(V) {
	return Math.sqrt(_sum(
		V.map(v => v**2)
	));
}

function normalize(V) {
	const len = length(V);
	return V.map(v => v / len);
}

function angle(A,B) {
	return Math.acos(
		dotProduct(A,B) / (
			length(A) * length(B)
		)
	);
}

function projection(A,B) {
	const dot = dotProduct(A,B);
	const ls = length(B)**2;
	return mul(B, dot/ls);
}

function arePerpendicular(A,B) {
	return dotProduct(A,B) === 0;
}

function areParallel(A,B) {
	const cp = crossProduct(A,B);
	return cp.every(v => v === 0);
}

})()
