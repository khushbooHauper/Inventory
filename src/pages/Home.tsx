import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadProducts } from "../redux/features/productSlice";
import { Chart, ChartConfiguration, registerables, ChartType } from "chart.js";
import "../assets/styles/home.scss";
import { Product } from "../types/product";

Chart.register(...registerables);

const Home = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const totalWeight = useSelector(
    (state: RootState) => state.product.totalWeight
  );
  const totalProducts = useSelector(
    (state: RootState) => state.product.totalProducts
  );
  const totalInventoryValue = useSelector(
    (state: RootState) => state.product.totalInventoryValue
  );
  const dispatch = useDispatch();

  const formatInventoryValue = (value: number): string => {
    if (value >= 1000000000) {
      const billionValue = value / 1000000000;
      return `${billionValue.toFixed(2)} billion`;
    } else if (value >= 10000000) {
      const croreValue = value / 10000000;
      return `${croreValue.toFixed(2)} crore`;
    } else if (value >= 100000) {
      const lakhValue = value / 100000;
      return `${lakhValue.toFixed(2)} lakh`;
    } else if (value >= 1000) {
      const thousandValue = value / 1000;
      return `${thousandValue.toFixed(2)} thousand`;
    } else {
      return `${value.toFixed(2)}`;
    }
  };
  
  const formattedValue = formatInventoryValue(totalInventoryValue);






  useEffect(() => {
    // Dispatch an action to load the products if the state is not already populated
    if (!totalProducts) {
      dispatch(loadProducts(products));
    }
  }, [dispatch, totalProducts]);

  const chart1Ref = useRef<HTMLCanvasElement | null>(null);
  const chart2Ref = useRef<HTMLCanvasElement | null>(null);
  const chart1Instance = useRef<Chart | null>(null);
  const chart2Instance = useRef<Chart<"pie", number[], unknown> | null>(null);

  useEffect(() => {
    // Create the first chart (Product Categories)
    if (totalProducts && chart1Ref.current) {
      const categoryCount = countProductsByCategory(products);

      const labels = Object.keys(categoryCount);
      const data = Object.values(categoryCount);

      if (chart1Instance.current) {
        chart1Instance.current.destroy();
      }

      chart1Instance.current = new Chart(chart1Ref.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Product Count",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      });
    }else if (!totalProducts && chart1Ref.current) {
      if (chart1Instance.current) {
        chart1Instance.current.destroy();
      }
    
      chart1Instance.current = new Chart(chart1Ref.current, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Product Count",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      });
    }

    // Create the second chart (Top Selling Items - Pie Chart)
    if (totalProducts && chart2Ref.current) {
      const topSellingItems = getTopSellingItems(products, 5);

      const labels = topSellingItems.map((item) => item.name);
      const data = topSellingItems.map((item) => item.quantity);

      if (chart2Instance.current) {
        chart2Instance.current.destroy();
      }

      chart2Instance.current = new Chart(chart2Ref.current, {
        type: "pie" as ChartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: "Quantity Sold",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 205, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      } as ChartConfiguration<"pie">);
    } else if (!totalProducts && chart2Ref.current) {
      if (chart2Instance.current) {
        chart2Instance.current.destroy();
      }
    
      chart2Instance.current = new Chart(chart2Ref.current, {
        type: "pie" as ChartType,
        data: {
          labels: ["No Products"],
          datasets: [
            {
              label: "Quantity Sold",
              data: [1],
              backgroundColor: ["grey"], 
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
          },
          elements: {
            arc: {
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.8)",
            },
          },
          
        },
      } as ChartConfiguration<"pie">);
    }
  }, [products, totalProducts]);

  const countProductsByCategory = (
    products: Product[]
  ): { [key: string]: number } => {
    const categoryCount: { [key: string]: number } = {};

    products.forEach((product) => {
      if (categoryCount[product.category]) {
        categoryCount[product.category]++;
      } else {
        categoryCount[product.category] = 1;
      }
    });

    return categoryCount;
  };

  const getTopSellingItems = (
    products: Product[],
    limit: number
  ): Product[] => {
    return products
      .filter((product) => product.quantity !== null)
      .sort((a, b) => (a.quantity || 0) - (b.quantity || 0))
      .reverse()
      .slice(0, limit);
  };

  return (
    <div style={{maxHeight:'100vh',overflowY:'scroll'}}>
      <div className="home">
        <Card className="card">
          <Card.Body>
            <Card.Title>Total Products</Card.Title>
            <Card.Text>{totalProducts}</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card">
          <Card.Body>
            <Card.Title>Total Weights</Card.Title>
            <Card.Text>{totalWeight} kg</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card">
          <Card.Body>
            <Card.Title>Total Inventory Value</Card.Title>
            <Card.Text>INR {formattedValue}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="middle-section">
        <Card className="feature-1">
          <Card.Header>PRODUCT DETAILS</Card.Header>
          <Card.Body>
            <Card.Title>Explore Product Categories</Card.Title>
            <Card.Text>
              Discover your products organized by category. Gain insights into
              each category's product count.
            </Card.Text>
            <canvas ref={chart1Ref}></canvas>
          </Card.Body>
        </Card>

        <Card className="feature-2">
          <Card.Header>TOP SELLING ITEMS</Card.Header>
          <Card.Body>
            <Card.Title>Top Selling Items</Card.Title>
            <Card.Text>
              Explore the top-selling items based on the quantity sold. Identify
              your most popular products and analyze their sales performance.
            </Card.Text>
            <div className="pie">
            <canvas ref={chart2Ref} ></canvas>
            </div>
           
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
