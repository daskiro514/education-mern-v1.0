export const monthLength = 8

export const getAdminChartOptions = () => {
  var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return {
    dataLabels: {
      enabled: true
    },
    xaxis: {
      type: 'date',
      categories: categories
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    },
  }
}

export const getAdminChartSeries = (transactions) => {
  var monthlyTotalSales = [200, 500, 400, 450, 300, 600, 300, 500, 100, 400, 200, 300]

  return [
    {
      name: 'Monthly Sales',
      data: monthlyTotalSales
    }
  ]
}