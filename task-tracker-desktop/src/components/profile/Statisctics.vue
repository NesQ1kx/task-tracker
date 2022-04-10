<template>
  <div class="mt-5" v-if="statistic.length">
    <div class="statistic-container">
      <div>
        <apexchart type="area" height="350" :options="tasksToDateChart.chartOptions" :series="tasksToDateChart.series"></apexchart>
      </div>
      <div class="d-flex justify-center mt-3">
        <apexchart type="pie" width="400" :options="tasksByTracker.chartOptions" :series="tasksByTracker.series"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import actions from '@/store/actions';
import { mapState } from 'vuex';

export default {
  name: 'Statistics',
  data() {
    return {
      tasksToDateChart: null,
      tasksByTracker: null,
    }
  },
  computed: {
    ...mapState({
      statistic: state => state.statistic,
    }),
  },
  async mounted() {
    await this.$store.dispatch(actions.GET_STATISTIC);
  },
  methods: {
    buildTasksToDateChart() {
      const statisitc = this.statistic;
      const object = statisitc
        .map(item => ({ ...item, date: new Date(item.date).toLocaleDateString('ru-RU') }))
        .reduce((acc, item) => {
          acc[item.date] ? acc[item.date] += 1 : acc[item.date] = 1;
          return acc;
      }, {});

      this.tasksToDateChart = {
        series: [
          {
            name: 'Количество задач',
            data: Object.keys(object).map(key => object[key]),
          }
        ],
        chartOptions: {
          xaxis: {
            type: 'date',
            categories: Object.keys(object),
          },
          chart: {
            toolbar: {
              tools: {
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
              }
            }
          },
          title: {
            text: 'Созданные задачи',
            align: 'left'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
        }
      }
    },
    buildTasksByTrackerChart() {
      const statisitc = this.statistic;
      const object = statisitc.reduce((acc, item) => {
        const trackerName = item.trackerName;
        acc[trackerName] ? acc[trackerName] += 1 : acc[trackerName] = 1;
        return acc;
      }, {});

      this.tasksByTracker = {
        series: Object.keys(object).map(key => object[key]),
        chartOptions: {
          labels: Object.keys(object),
          chart: {
            toolbar: {
              tools: {
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
              }
            }
          },
          title: {
            text: 'Задачи по трекерам',
            align: 'left'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
        }
      }
    }
  },
  watch: {
    statistic(value) {
      if (value.length) {
        this.buildTasksToDateChart();
        this.buildTasksByTrackerChart();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.statistic-container  {
  max-height: 450px;
  overflow-y: scroll;
}
</style>