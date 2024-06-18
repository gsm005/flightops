import networkx as nx
import csv

def calculate_shortest_route(graph, source, destination):
    return nx.shortest_path(graph, source, destination, weight='distance')

def create_graph():
    graph = nx.Graph()
    with open('airports.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            graph.add_node(row['Name'], latitude=float(row['Latitude']), longitude=float(row['Longitude']))
    with open('D:/GEU/Aerorthon/FinalApp/routes.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            graph.add_edge(row['Source_Name'], row['Destination_Name'], distance=float(row['Distance']))
    return graph

def get_coordinates(airport_code, graph):
    node_data = graph.nodes[airport_code]
    return node_data['latitude'], node_data['longitude']
