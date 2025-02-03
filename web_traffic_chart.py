import matplotlib.pyplot as plt
import numpy as np

# Data from the chart in the image
months = ['07/2019', '08/2019', '09/2019', '10/2019', '11/2019']
searches = [50, 53, 59, 56, 62]
direct = [39, 47, 42, 51, 51]
social_media = [70, 80, 90, 87, 92]

# Setting up the bar positions
x = np.arange(len(months))
width = 0.25

# Creating the column chart
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(x - width, searches, width, label='Searches', color='blue')
ax.bar(x, direct, width, label='Direct', color='pink')
ax.bar(x + width, social_media, width, label='Social Media', color='orange')

# Labels and titles
ax.set_xlabel('Months')
ax.set_ylabel('Visitors (in thousands)')
ax.set_title('Visitors by Web Traffic')
ax.set_xticks(x)
ax.set_xticklabels(months)
ax.legend()

# Show the plot
plt.show()
