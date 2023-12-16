using System;
using System.Diagnostics;

namespace HomeWorkOne
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SortArray sortArray = new SortArray(10, 100, 1000);
            sortArray.Fill();
            sortArray.SelectionSort();
            Console.ReadKey();
        }
    }
    class SortArray
    {
        private int [] arr1;
        private int [] arr2;
        private int [] arr3;
        public SortArray(int size1,int size2,int size3)
        {
            arr1 = new int[size1];
            arr2 = new int[size2];
            arr3 = new int[size3];
        }
        public void Fill()
        {
            Random random = new Random();
            for (int i = 0; i < arr1.Length; i++)
            {
                arr1[i] = random.Next(1000);
            }
            for (int i = 0; i < arr2.Length; i++)
            {
                arr2[i] = random.Next(1000);
            }
            for (int i = 0; i < arr3.Length; i++)
            {
                arr3[i] = random.Next(1000);
            }
        }
        public void SelectionSort()
        {           
            Stopwatch Stopwatch =new Stopwatch();
            Stopwatch.Start();
            Sort(arr1);
            Stopwatch.Stop();
            Console.WriteLine(arr1.Length+":"+Stopwatch.ElapsedMilliseconds);
            Stopwatch.Reset();
            Stopwatch.Start();
            Sort(arr2);
            Stopwatch.Stop();
            Console.WriteLine(arr2.Length + ":" + Stopwatch.ElapsedMilliseconds);
            Stopwatch.Reset();
            Sort(arr3);
            Stopwatch.Stop();
            Console.WriteLine(arr3.Length + ":" + Stopwatch.ElapsedMilliseconds);
        }
        private void Sort(int [] arr)
        {
            int n=arr.Length;
            for (int i = 0;i < n-1;i++)
            {
                int minIndex = i;
                for(int j=i+1;j<n;j++)
                {
                    if(arr[j] < arr[minIndex])
                    {
                        minIndex = j;
                    }
                }
                int temp =arr[minIndex];
                arr[minIndex] = arr[i];
                arr[i] = temp;
            }
        }
    }
}