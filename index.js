(function () {

const DELTA = 1e-5;

Math.vc = {
	gradient,
	divergence,
	curl,
	laplacian,
	vectorLaplacian
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

})()
