export const formatearValor = cantidad =>
{
    return Number(cantidad).toLocaleString('en-US', 
    {
        style: 'currency',
        currency: 'USD'
    })
}